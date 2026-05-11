import {
  createTransactionService,
  getVendorTransactionsService,
  getTransactionByIdService,
  updateTransactionStatusService
} from "./transaction.service.js";

export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await createTransactionService(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

export const getVendorTransactions = async (req, res, next) => {
  try {
    const transactions = await getVendorTransactionsService(req.params.vendorId);

    res.status(200).json({
      success: true,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await getTransactionByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransactionStatus = async (req, res, next) => {
  try {
    const transaction = await updateTransactionStatusService(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Transaction status updated successfully",
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};