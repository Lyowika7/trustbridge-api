import prisma from "../../config/prisma.js";
import { addTrustScoreJob } from "../../queues/trustScore.queue.js";

const allowedVerificationStatuses = [
  "PENDING",
  "VERIFIED",
  "REJECTED"
];

export const uploadDocumentService = async (data) => {
  const vendor = await prisma.vendor.findUnique({
    where: {
      id: data.vendorId
    }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return prisma.document.create({
    data: {
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      vendorId: data.vendorId
    }
  });
};

export const getVendorDocumentsService = async (vendorId) => {
  return prisma.document.findMany({
    where: {
      vendorId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const verifyDocumentService = async (id, verificationStatus) => {
  if (!allowedVerificationStatuses.includes(verificationStatus)) {
    throw new Error("Invalid verification status");
  }

  const document = await prisma.document.findUnique({
    where: {
      id
    }
  });

  if (!document) {
    throw new Error("Document not found");
  }

  const updatedDocument = await prisma.document.update({
    where: {
      id
    },
    data: {
      verification: verificationStatus
    }
  });

  await addTrustScoreJob(updatedDocument.vendorId);

  return updatedDocument;
};

export const deleteDocumentService = async (id) => {
  const document = await prisma.document.findUnique({
    where: {
      id
    }
  });

  if (!document) {
    throw new Error("Document not found");
  }

  await prisma.document.delete({
    where: {
      id
    }
  });

  return true;
};