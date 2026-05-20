import {
  createVendorService,
  getAllVendorsService,
  getVendorByIdService,
  updateVendorService,
  deleteVendorService,
  getMyVendorService,
  updateMyVendorService,
  getTopRatedVendorsService,
  searchVendorsService
} from "./vendor.service.js";

import {
  createVendorSchema,
  updateVendorSchema
} from "./vendor.validation.js";

import { calculateTrustScoreService } from "../trustScore/trustScore.service.js";

export const createVendor = async (req, res, next) => {
  try {
    const validatedData = createVendorSchema.parse(req.body);
    const vendor = await createVendorService(req.user.id, validatedData);

    res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      data: vendor
    });
  } catch (error) {
    next(error);
  }
};

export const getAllVendors = async (req, res, next) => {
  try {
    const vendors = await getAllVendorsService({
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search
    });

    res.status(200).json({
      success: true,
      data: vendors
    });
  } catch (error) {
    next(error);
  }
};

export const getVendorById = async (req, res, next) => {
  try {
    const vendor = await getVendorByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    next(error);
  }
};

export const updateVendor = async (req, res, next) => {
  try {
    const validatedData = updateVendorSchema.parse(req.body);

    const vendor = await updateVendorService(
      req.params.id,
      validatedData,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      data: vendor
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (req, res, next) => {
  try {
    await deleteVendorService(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getMyVendor = async (req, res, next) => {
  try {
    const vendor = await getMyVendorService(req.user.id);

    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyVendor = async (req, res, next) => {
  try {
    const validatedData = updateVendorSchema.parse(req.body);

    const vendor = await updateMyVendorService(
      req.user.id,
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Vendor profile updated successfully",
      data: vendor
    });
  } catch (error) {
    next(error);
  }
};

export const getTopRatedVendors = async (req, res, next) => {
  try {
    const vendors = await getTopRatedVendorsService();

    res.status(200).json({
      success: true,
      data: vendors
    });
  } catch (error) {
    next(error);
  }
};

export const searchVendors = async (req, res, next) => {
  try {
    const vendors = await searchVendorsService(req.query.query || "");

    res.status(200).json({
      success: true,
      data: vendors
    });
  } catch (error) {
    next(error);
  }
};

export const getVendorTrustScore = async (req, res, next) => {
  try {
    const result = await calculateTrustScoreService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Vendor trust score calculated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};