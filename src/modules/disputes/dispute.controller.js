import {
  createDisputeService,
  getAllDisputesService,
  getDisputeByIdService,
  updateDisputeStatusService,
  deleteDisputeService
} from "./dispute.service.js";

export const createDispute = async (req, res, next) => {
  try {
    const dispute = await createDisputeService(req.body);

    res.status(201).json({
      success: true,
      message: "Dispute created successfully",
      data: dispute
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDisputes = async (req, res, next) => {
  try {
    const disputes = await getAllDisputesService();

    res.status(200).json({
      success: true,
      data: disputes
    });
  } catch (error) {
    next(error);
  }
};

export const getDisputeById = async (req, res, next) => {
  try {
    const dispute = await getDisputeByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: dispute
    });
  } catch (error) {
    next(error);
  }
};

export const updateDisputeStatus = async (req, res, next) => {
  try {
    const dispute = await updateDisputeStatusService(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Dispute status updated successfully",
      data: dispute
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDispute = async (req, res, next) => {
  try {
    await deleteDisputeService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Dispute deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};