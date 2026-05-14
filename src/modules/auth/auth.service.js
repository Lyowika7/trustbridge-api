import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";
import sendEmail from "../../utils/sendEmail.js";

import {
  generateAccessToken,
  generateRefreshToken
} from "../../utils/token.js";

const createVerificationToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return { rawToken, hashedToken };
};

const getSafeUser = (user) => {
  const {
    password,
    emailVerificationToken,
    emailVerificationExpires,
    passwordResetToken,
    passwordResetExpires,
    ...safeUser
  } = user;

  return safeUser;
};

export const registerUserService = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const { rawToken, hashedToken } = createVerificationToken();

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: new Date(Date.now() + 15 * 60 * 1000)
    }
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your TrustBridge email",
    html: `
      <h2>Welcome to TrustBridge</h2>
      <p>Hello ${user.fullName},</p>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${verificationUrl}" style="background:#020617;color:#fff;padding:12px 18px;text-decoration:none;border-radius:8px;display:inline-block;">
        Verify Email
      </a>
      <p>This link expires in 15 minutes.</p>
    `
  });

  return {
    user: getSafeUser(user),
    message: "Verification email sent successfully"
  };
};

export const verifyEmailService = async (token) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: hashedToken,
      emailVerificationExpires: {
        gt: new Date()
      }
    }
  });

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null
    }
  });

  return getSafeUser(updatedUser);
};

export const resendVerificationService = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isEmailVerified) {
    throw new Error("Email is already verified");
  }

  const { rawToken, hashedToken } = createVerificationToken();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerificationToken: hashedToken,
      emailVerificationExpires: new Date(Date.now() + 15 * 60 * 1000)
    }
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

  await sendEmail({
    to: user.email,
    subject: "Resend: Verify your TrustBridge email",
    html: `
      <h2>Verify your TrustBridge email</h2>
      <p>Hello ${user.fullName},</p>
      <p>Click below to verify your email:</p>
      <a href="${verificationUrl}" style="background:#020617;color:#fff;padding:12px 18px;text-decoration:none;border-radius:8px;display:inline-block;">
        Verify Email
      </a>
      <p>This link expires in 15 minutes.</p>
    `
  });

  return {
    message: "Verification email resent successfully"
  };
};

export const loginUserService = async (data) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  if (!user.isEmailVerified) {
    throw new Error("Please verify your email before logging in");
  }

  const accessToken = generateAccessToken({
    id: user.id,
    role: user.role
  });

  const refreshToken = generateRefreshToken({
    id: user.id
  });

  return {
    user: getSafeUser(user),
    accessToken,
    refreshToken
  };
};