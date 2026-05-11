import prisma from "../../config/prisma.js";
import { addWebhookJob } from "../../queues/webhook.queue.js";
// import { dispatchWebhook } from "../../utils/webhookDispatcher.js";

export const calculateTrustScoreService = async (vendorId) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id: vendorId },
    include: {
      reviews: true,
      reports: true,
      transactions: true,
      disputes: true,
      documents: true
    }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  let score = 50;

  if (vendor.verificationStatus === "VERIFIED") score += 20;
  if (vendor.cacNumber) score += 10;
  if (vendor.documents.some((doc) => doc.verification === "VERIFIED")) score += 10;

  if (vendor.reviews.length > 0) {
    const averageRating =
      vendor.reviews.reduce((sum, review) => sum + review.rating, 0) /
      vendor.reviews.length;

    score += averageRating * 4;
  }

  const successfulTransactions = vendor.transactions.filter(
    (transaction) => transaction.status === "SUCCESSFUL"
  ).length;

  score += Math.min(successfulTransactions * 2, 10);

  score -= vendor.reports.length * 10;
  score -= vendor.disputes.length * 5;

  score = Math.max(0, Math.min(100, Math.round(score)));

  const riskLevel =
    score >= 80 ? "LOW" : score >= 50 ? "MEDIUM" : "HIGH";

  await prisma.trustScoreHistory.create({
    data: {
      oldScore: vendor.trustScore,
      newScore: score,
      reason: "Trust score recalculated",
      vendorId: vendor.id
    }
  });

  await prisma.vendor.update({
    where: { id: vendor.id },
    data: {
      trustScore: score
    }
  });

  await addWebhookJob({
    userId: vendor.ownerId,
    event: "trust_score.updated",
    payload: {
      vendorId: vendor.id,
      businessName: vendor.businessName,
      oldScore: vendor.trustScore,
      newScore: score,
      riskLevel
    }
  });

  return {
    vendorId: vendor.id,
    businessName: vendor.businessName,
    trustScore: score,
    riskLevel,
    verificationStatus: vendor.verificationStatus,
    breakdown: {
      baseScore: 50,
      businessVerified: vendor.verificationStatus === "VERIFIED",
      hasCacNumber: Boolean(vendor.cacNumber),
      verifiedDocuments: vendor.documents.filter(
        (doc) => doc.verification === "VERIFIED"
      ).length,
      reviewsCount: vendor.reviews.length,
      reportsCount: vendor.reports.length,
      disputesCount: vendor.disputes.length,
      successfulTransactions
    }
  };
};