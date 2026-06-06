const userRoles = Object.freeze({
  CUSTOMER: "customer",
  SELLER: "seller",
  ADMIN: "admin",
});

const ACCOUNT_STATUS = Object.freeze({
  PENDING: "pending",
  EMAIL_VERIFIED: "email_verified",
  APPROVED: "approved",
  REJECTED: "rejected",
});

module.exports = {
  userRoles,
  ACCOUNT_STATUS,
};