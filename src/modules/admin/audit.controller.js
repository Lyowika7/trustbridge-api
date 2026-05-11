import { getAuditLogsService } from "./audit.service.js";

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await getAuditLogsService();

    res.status(200).json({
      success: true,
      message: "Audit logs fetched successfully",
      data: logs
    });
  } catch (error) {
    next(error);
  }
};