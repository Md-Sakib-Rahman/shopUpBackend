const userRoles = Object.freeze({
  USER: "user",
  ADMIN: "admin",
});

const ACCOUNT_STATUS = Object.freeze({
  PENDING: "pending",
  EMAIL_VERIFIED: "email_verified",
  SUSPENDED: "suspended",
});
const SELLER_STATUS = Object.freeze({
  NONE: "none",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
});
module.exports = {
  userRoles,
  ACCOUNT_STATUS,
  SELLER_STATUS
};