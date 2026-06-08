const { SELLER_STATUS } = require("./enums/user.enums");

class Seller {
  constructor({
    userId,

    shopName,

    businessType,

    description = "",

    tradeLicenseNumber = null,

    nidNumber = null,

    bankAccountName = null,

    bankAccountNumber = null,

    bankName = null,

    bkashNumber = null,

    logo = null,

    coverImage = null,

    status = SELLER_STATUS.PENDING,

    rejectionReason = null,
  }) {
    this.userId = userId;

    this.shopName = shopName;

    this.businessType = businessType;

    this.description = description;

    this.tradeLicenseNumber = tradeLicenseNumber;

    this.nidNumber = nidNumber;

    this.bankAccountName = bankAccountName;

    this.bankAccountNumber = bankAccountNumber;

    this.bankName = bankName;

    this.bkashNumber = bkashNumber;

    this.logo = logo;

    this.coverImage = coverImage;

    this.status = status;

    this.rejectionReason = rejectionReason;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Seller;