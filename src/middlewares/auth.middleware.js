import jwt from "jsonwebtoken";
import env from "../config/env.js";
import prisma from "../config/prisma.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });
    }

    const decoded = jwt.verify(token, env.jwtAccessSecret);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;