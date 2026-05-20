import prisma from "../../config/prisma.js";
import { getCache, setCache } from "../../utils/cache.js";

export const createVendorService = async (userId, data) => {
  const existingVendor = await prisma.vendor.findUnique({
    where: { businessEmail: data.businessEmail }
  });

  if (existingVendor) {
    throw new Error("Vendor already exists");
  }

  const existingOwnerVendor = await prisma.vendor.findUnique({
    where: { ownerId: userId }
  });

  if (existingOwnerVendor) {
    throw new Error("This user already owns a vendor profile");
  }

  return prisma.vendor.create({
    data: {
      ...data,
      owner: {
        connect: { id: userId }
      }
    }
  });
};

export const getAllVendorsService = async ({
  page = 1,
  limit = 10,
  search = ""
}) => {
  const cacheKey = `vendors:page=${page}:limit=${limit}:search=${search}`;
  const cachedVendors = await getCache(cacheKey);

  if (cachedVendors) {
    return { ...cachedVendors, source: "cache" };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const where = {
    OR: [
      {
        businessName: {
          contains: search,
          mode: "insensitive"
        }
      },
      {
        businessEmail: {
          contains: search,
          mode: "insensitive"
        }
      },
      {
        category: {
          contains: search,
          mode: "insensitive"
        }
      }
    ]
  };

  const vendors = await prisma.vendor.findMany({
    where,
    skip,
    take: Number(limit),
    orderBy: { createdAt: "desc" }
  });

  const total = await prisma.vendor.count({ where });

  const result = {
    data: vendors,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    },
    source: "database"
  };

  await setCache(cacheKey, result, 60);

  return result;
};

export const getVendorByIdService = async (id) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id },
    include: {
      reviews: true,
      reports: true,
      disputes: true,
      documents: true
    }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor;
};

export const updateVendorService = async (id, data, userId) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  if (vendor.ownerId !== userId) {
    throw new Error("Not authorized to update this vendor");
  }

  return prisma.vendor.update({
    where: { id },
    data
  });
};

export const deleteVendorService = async (id, userId) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  if (vendor.ownerId !== userId) {
    throw new Error("Not authorized to delete this vendor");
  }

  await prisma.vendor.delete({
    where: { id }
  });

  return true;
};

export const getMyVendorService = async (userId) => {
  const vendor = await prisma.vendor.findUnique({
    where: { ownerId: userId },
    include: {
      reviews: true,
      reports: true,
      disputes: true,
      documents: true
    }
  });

  if (!vendor) {
    throw new Error("Vendor profile not found");
  }

  return vendor;
};

export const updateMyVendorService = async (userId, data) => {
  const vendor = await prisma.vendor.findUnique({
    where: { ownerId: userId }
  });

  if (!vendor) {
    throw new Error("Vendor profile not found");
  }

  return prisma.vendor.update({
    where: { ownerId: userId },
    data
  });
};

export const getTopRatedVendorsService = async () => {
  return prisma.vendor.findMany({
    orderBy: { trustScore: "desc" },
    take: 10
  });
};

export const searchVendorsService = async (query = "") => {
  return prisma.vendor.findMany({
    where: {
      OR: [
        {
          businessName: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          businessEmail: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          category: {
            contains: query,
            mode: "insensitive"
          }
        }
      ]
    },
    orderBy: { trustScore: "desc" }
  });
};