import prisma from "../../config/prisma.js";
import { addTrustScoreJob } from "../../queues/trustScore.queue.js";

const allowedStatuses = ["PENDING", "SUCCESSFUL", "FAILED", "REFUNDED"];

export const createTransactionService = async (data) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id: data.vendorId }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  if (!allowedStatuses.includes(data.status)) {
    throw new Error("Invalid transaction status");
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount: data.amount,
      status: data.status,
      vendorId: data.vendorId
    }
  });

  await addTrustScoreJob(data.vendorId);

  return transaction;
};

export const getVendorTransactionsService = async (vendorId) => {
  return prisma.transaction.findMany({
    where: { vendorId },
    orderBy: { createdAt: "desc" }
  });
};

export const getTransactionByIdService = async (id) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: { vendor: true }
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

export const updateTransactionStatusService = async (id, status) => {
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid transaction status");
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id }
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id },
    data: { status }
  });

  await addTrustScoreJob(updatedTransaction.vendorId);

  return updatedTransaction;
};