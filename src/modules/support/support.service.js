import prisma from "../../config/prisma.js";

const allowedStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];

export const createSupportTicketService = async (userId, data) => {
  if (data.disputeId) {
    const dispute = await prisma.dispute.findUnique({
      where: { id: data.disputeId }
    });

    if (!dispute) {
      throw new Error("Dispute not found");
    }
  }

  return prisma.supportTicket.create({
    data: {
      userId,
      disputeId: data.disputeId,
      subject: data.subject,
      message: data.message
    }
  });
};

export const getMySupportTicketsService = async (userId) => {
  return prisma.supportTicket.findMany({
    where: { userId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" }
      },
      dispute: true
    },
    orderBy: { createdAt: "desc" }
  });
};

export const getAllSupportTicketsService = async () => {
  return prisma.supportTicket.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true
        }
      },
      dispute: true,
      messages: {
        orderBy: { createdAt: "asc" }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};

export const updateSupportTicketStatusService = async (id, status) => {
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid support ticket status");
  }

  const ticket = await prisma.supportTicket.findUnique({
    where: { id }
  });

  if (!ticket) {
    throw new Error("Support ticket not found");
  }

  return prisma.supportTicket.update({
    where: { id },
    data: { status }
  });
};

export const addSupportTicketMessageService = async (
  ticketId,
  senderId,
  message
) => {
  const ticket = await prisma.supportTicket.findUnique({
    where: { id: ticketId }
  });

  if (!ticket) {
    throw new Error("Support ticket not found");
  }

  return prisma.supportTicketMessage.create({
    data: {
      ticketId,
      senderId,
      message
    }
  });
};