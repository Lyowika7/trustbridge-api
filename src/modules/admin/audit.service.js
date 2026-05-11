import prisma from "../../config/prisma.js";

export const createAuditLogService = async ({
  userId,
  action,
  ipAddress,
  userAgent
}) => {
  return prisma.auditLog.create({
    data: {
      userId,
      action,
      ipAddress,
      userAgent
    }
  });
};

export const getAuditLogsService = async () => {
  return prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};