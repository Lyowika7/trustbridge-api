import {
  uploadDocumentService,
  getVendorDocumentsService,
  verifyDocumentService,
  deleteDocumentService
} from "./document.service.js";

export const uploadDocument = async (req, res, next) => {
  try {
    const document = await uploadDocumentService(req.body);

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document
    });
  } catch (error) {
    next(error);
  }
};

export const getVendorDocuments = async (req, res, next) => {
  try {
    const documents = await getVendorDocumentsService(req.params.vendorId);

    res.status(200).json({
      success: true,
      data: documents
    });
  } catch (error) {
    next(error);
  }
};

export const verifyDocument = async (req, res, next) => {
  try {
    const document = await verifyDocumentService(
      req.params.id,
      req.body.verificationStatus
    );

    res.status(200).json({
      success: true,
      message: "Document verification updated successfully",
      data: document
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    await deleteDocumentService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Document deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};