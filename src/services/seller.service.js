const sellerRepo = require("../repository/seller.repository");
const userRepo = require("../repository/user.repository");
const { SELLER_STATUS, ACCOUNT_STATUS } = require("../models/enums/user.enums");

async function applySeller(data) {
  const { userId, shopName, businessType, bkashNumber } = data;

  const user = await userRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.accountStatus !== ACCOUNT_STATUS.EMAIL_VERIFIED) {
    throw new Error("Email must be verified before applying as seller");
  }

  if (user.sellerStatus === SELLER_STATUS.PENDING) {
    throw new Error("Seller application already pending");
  }

  if (user.sellerStatus === SELLER_STATUS.APPROVED) {
    throw new Error("User is already a seller");
  }

  const existingSeller = await sellerRepo.findByUserId(userId);

  if (existingSeller) {
    throw new Error("Seller profile already exists");
  }

  const seller = {
    userId,
    shopName,
    businessType,
    bkashNumber,
    status: SELLER_STATUS.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await sellerRepo.create(seller);

  await userRepo.updateById(userId, {
    sellerStatus: SELLER_STATUS.PENDING,
    updatedAt: new Date(),
  });

  return {
    sellerId: result.insertedId,
    status: SELLER_STATUS.PENDING,
  };
}


async function approveSeller(userId) {
  const seller = await sellerRepo.findByUserId(userId);

  if (!seller) {
    throw new Error("Seller not found");
  }

  await sellerRepo.updateByUserId(userId, {
    status: SELLER_STATUS.APPROVED,
    updatedAt: new Date(),
  });

  await userRepo.updateById(userId, {
    sellerStatus: SELLER_STATUS.APPROVED,
    updatedAt: new Date(),
  });

  return { message: "Seller approved successfully" };
}

async function rejectSeller(userId, reason) {
  const seller = await sellerRepo.findByUserId(userId);

  if (!seller) {
    throw new Error("Seller not found");
  }

  await sellerRepo.updateByUserId(userId, {
    status: SELLER_STATUS.REJECTED,
    rejectionReason: reason,
    updatedAt: new Date(),
  });

  await userRepo.updateById(userId, {
    sellerStatus: SELLER_STATUS.REJECTED,
    updatedAt: new Date(),
  });

  return { message: "Seller rejected" };
}

module.exports = {
  applySeller,
  approveSeller,
  rejectSeller,
};