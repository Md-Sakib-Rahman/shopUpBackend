const {userRoles} = require("./enums/user.enums")

class User {
  constructor({
    name,
    email,
    passwordHash,
    role = userRoles.CUSTOMER, // seller, customer, admin
    phone = null,
    avatar = null,
    isVerified = false,
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
    this.isVerified = isVerified;
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
      isVerified: this.isVerified,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;