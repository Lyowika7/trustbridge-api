import {
  createReviewService,
  getVendorReviewsService,
  updateReviewService,
  deleteReviewService
} from "./review.service.js";

export const createReview = async (req, res, next) => {
  try {
    const review = await createReviewService(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const getVendorReviews = async (req, res, next) => {
  try {
    const reviews = await getVendorReviewsService(req.params.vendorId);

    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const review = await updateReviewService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await deleteReviewService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};