import prisma from "../../config/prisma.js";
import { addTrustScoreJob } from "../../queues/trustScore.queue.js";

export const createReportService = async (data) => {
  const vendor = await prisma.vendor.findUnique({
    where: {
      id: data.vendorId
    }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const report = await prisma.scamReport.create({
    data: {
      title: data.title,
      description: data.description,
      vendorId: data.vendorId
    }
  });

  await addTrustScoreJob(data.vendorId);

  return report;
};

export const getAllReportsService = async () => {
  return prisma.scamReport.findMany({
    include: {
      vendor: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getReportByIdService = async (id) => {
  const report = await prisma.scamReport.findUnique({
    where: { id },
    include: {
      vendor: true
    }
  });

  if (!report) {
    throw new Error("Report not found");
  }

  return report;
};

export const updateReportStatusService = async (id, status) => {
  const report = await prisma.scamReport.findUnique({
    where: { id }
  });

  if (!report) {
    throw new Error("Report not found");
  }

  return prisma.scamReport.update({
    where: { id },
    data: { status }
  });
};

export const deleteReportService = async (id) => {
  const report = await prisma.scamReport.findUnique({
    where: { id }
  });

  if (!report) {
    throw new Error("Report not found");
  }

  await prisma.scamReport.delete({
    where: { id }
  });

  return true;
};