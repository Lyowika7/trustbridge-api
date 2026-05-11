import {
  createReportService,
  getAllReportsService,
  getReportByIdService,
  updateReportStatusService,
  deleteReportService
} from "./report.service.js";

export const createReport = async (req, res, next) => {
  try {
    const report = await createReportService(req.body);

    res.status(201).json({
      success: true,
      message: "Fraud report created successfully",
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReports = async (req, res, next) => {
  try {
    const reports = await getAllReportsService();

    res.status(200).json({
      success: true,
      data: reports
    });
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const report = await getReportByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const report = await updateReportStatusService(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Report status updated successfully",
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReport = async (req, res, next) => {
  try {
    await deleteReportService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Report deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};