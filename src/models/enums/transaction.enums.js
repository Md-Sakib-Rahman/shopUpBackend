const TRANSACTION_TYPE = Object.freeze({
  INIT: "init",
  PAYMENT_SUCCESS: "payment_success",
  PAYMENT_FAILED: "payment_failed",
  REFUND: "refund",
  CANCELLED: "cancelled",
  CHARGEBACK: "chargeback",
});

const TRANSACTION_STATUS = Object.freeze({
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
});

const PAYMENT_GATEWAY = Object.freeze({
  SSLCOMMERZ: "sslcommerz",
  BKASH: "bkash",
  NAGAD: "nagad",
  CARD: "card",
  STRIPE: "stripe",
});

module.exports = {
  TRANSACTION_TYPE,
  TRANSACTION_STATUS,
  PAYMENT_GATEWAY,
};