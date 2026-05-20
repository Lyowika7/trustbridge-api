import {
  createSupportTicketService,
  getMySupportTicketsService,
  getAllSupportTicketsService,
  updateSupportTicketStatusService,
  addSupportTicketMessageService
} from "./support.service.js";

export const createSupportTicket = async (req, res, next) => {
  try {
    const ticket = await createSupportTicketService(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Support ticket created successfully",
      data: ticket
    });
  } catch (error) {
    next(error);
  }
};

export const getMySupportTickets = async (req, res, next) => {
  try {
    const tickets = await getMySupportTicketsService(req.user.id);

    res.status(200).json({
      success: true,
      data: tickets
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSupportTickets = async (req, res, next) => {
  try {
    const tickets = await getAllSupportTicketsService();

    res.status(200).json({
      success: true,
      data: tickets
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupportTicketStatus = async (req, res, next) => {
  try {
    const ticket = await updateSupportTicketStatusService(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Support ticket status updated successfully",
      data: ticket
    });
  } catch (error) {
    next(error);
  }
};

export const addSupportTicketMessage = async (req, res, next) => {
  try {
    const message = await addSupportTicketMessageService(
      req.params.id,
      req.user.id,
      req.body.message
    );

    res.status(201).json({
      success: true,
      message: "Support ticket message added successfully",
      data: message
    });
  } catch (error) {
    next(error);
  }
};