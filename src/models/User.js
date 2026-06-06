const {
  userRoles,
  ACCOUNT_STATUS,
} = require("./enums/user.enums");

class User {
  constructor({
    name,
    email,
    passwordHash,
    role = userRoles.CUSTOMER,
    phone = null,
    avatar = null,
    accountStatus = ACCOUNT_STATUS.PENDING,
    isActive = true,
    refreshToken = null,
    addresses = [],
  }) {
    if (!Object.values(userRoles).includes(role)) {
      throw new Error("Invalid user role");
    }

    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;

    this.phone = phone;
    this.avatar = avatar;

    this.accountStatus = accountStatus;

    this.isActive = isActive;
    this.refreshToken = refreshToken;
    this.addresses = addresses;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      avatar: this.avatar,
      accountStatus: this.accountStatus,
      isActive: this.isActive,
      addresses: this.addresses,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;