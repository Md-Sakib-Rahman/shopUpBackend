const { PAYMENT_METHOD } =
  require("../models/enums/payment.enums");

const {
  PAYMENT_STATUS,
} = require("../models/enums/order.enums");

function validatePayment(data) {
  const errors = [];

  const {
    orderId,
    userId,
    amount,
    method,
    status,
    provider,
    sessionId,
    providerTransactionId,
  } = data;

 
  if (!orderId) {
    errors.push("Order ID is required");
  }

  if (!userId) {
    errors.push("User ID is required");
  }

 
  if (
    typeof amount !== "number" ||
    amount <= 0
  ) {
    errors.push("Amount must be greater than 0");
  }

 
  if (
    !Object.values(PAYMENT_METHOD).includes(method)
  ) {
    errors.push("Invalid payment method");
  }

 
  if (
    status &&
    !Object.values(PAYMENT_STATUS).includes(status)
  ) {
    errors.push("Invalid payment status");
  }

 
  if (provider && typeof provider !== "string") {
    errors.push("Provider must be a string");
  }

 
  if (sessionId && typeof sessionId !== "string") {
    errors.push("Session ID must be a string");
  }

 
  if (
    providerTransactionId &&
    typeof providerTransactionId !== "string"
  ) {
    errors.push("Transaction ID must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validatePayment,
};