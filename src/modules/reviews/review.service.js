import prisma from "../../config/prisma.js";
import { addTrustScoreJob } from "../../queues/trustScore.queue.js";

export const createReviewService = async (data) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id: data.vendorId }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const review = await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      vendorId: data.vendorId
    }
  });

  await addTrustScoreJob(data.vendorId);

  return review;
};

export const getVendorReviewsService = async (vendorId) => {
  return prisma.review.findMany({
    where: { vendorId },
    orderBy: { createdAt: "desc" }
  });
};

export const updateReviewService = async (id, data) => {
  const review = await prisma.review.findUnique({
    where: { id }
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.review.update({
    where: { id },
    data
  });
};

export const deleteReviewService = async (id) => {
  const review = await prisma.review.findUnique({
    where: { id }
  });

  if (!review) {
    throw new Error("Review not found");
  }

  await prisma.review.delete({
    where: { id }
  });

  return true;
};