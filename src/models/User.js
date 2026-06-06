const {
  userRoles,
  ACCOUNT_STATUS,
  SELLER_STATUS,
} = require("./enums/user.enums");

class User {
  constructor({
    name,
    email,
    passwordHash,
    role = userRoles.USER,
    phone = null,
    avatar = null,
    accountStatus = ACCOUNT_STATUS.PENDING,
    sellerStatus = SELLER_STATUS.NONE,
    isActive = true,
    refreshToken = null,
    addresses = [],
  }) {
    if (!Object.values(userRoles).includes(role)) {
      throw new Error("Invalid user role");
    }
    if (!Object.values(SELLER_STATUS).includes(sellerStatus)) {
      throw new Error("Invalid seller status");
    }
    if (!Object.values(ACCOUNT_STATUS).includes(accountStatus)) {
      throw new Error("Invalid account status");
    }
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;

    this.phone = phone;
    this.avatar = avatar;

    this.accountStatus = accountStatus;
    this.sellerStatus = sellerStatus;
    this.isActive = isActive;
    this.refreshToken = refreshToken;
    this.addresses = addresses;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      avatar: this.avatar,
      accountStatus: this.accountStatus,
      isActive: this.isActive,
      addresses: this.addresses,
      sellerStatus: this.sellerStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;
