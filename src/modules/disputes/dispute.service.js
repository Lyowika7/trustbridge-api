import prisma from "../../config/prisma.js";
import { addTrustScoreJob } from "../../queues/trustScore.queue.js";

const allowedStatuses = ["OPEN", "REVIEWING", "RESOLVED", "REJECTED"];

export const createDisputeService = async (data) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id: data.vendorId }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const dispute = await prisma.dispute.create({
    data: {
      title: data.title,
      description: data.description,
      vendorId: data.vendorId
    }
  });

  await addTrustScoreJob(data.vendorId);

  return dispute;
};

export const getAllDisputesService = async () => {
  return prisma.dispute.findMany({
    include: { vendor: true },
    orderBy: { createdAt: "desc" }
  });
};

export const getDisputeByIdService = async (id) => {
  const dispute = await prisma.dispute.findUnique({
    where: { id },
    include: { vendor: true }
  });

  if (!dispute) {
    throw new Error("Dispute not found");
  }

  return dispute;
};

export const updateDisputeStatusService = async (id, status) => {
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid dispute status");
  }

  const dispute = await prisma.dispute.findUnique({
    where: { id }
  });

  if (!dispute) {
    throw new Error("Dispute not found");
  }

  const updatedDispute = await prisma.dispute.update({
    where: { id },
    data: { status }
  });

  await addTrustScoreJob(updatedDispute.vendorId);

  return updatedDispute;
};

export const deleteDisputeService = async (id) => {
  const dispute = await prisma.dispute.findUnique({
    where: { id }
  });

  if (!dispute) {
    throw new Error("Dispute not found");
  }

  await prisma.dispute.delete({
    where: { id }
  });

  return true;
};