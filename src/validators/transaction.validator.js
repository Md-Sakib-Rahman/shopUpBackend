const {
  TRANSACTION_TYPE,
  TRANSACTION_STATUS,
  PAYMENT_GATEWAY,
} = require("../models/enums/transaction.enums");

function validateTransaction(data) {
  const errors = [];

  const {
    orderId,
    paymentId,
    userId,
    amount,
    type,
    status,
    gateway,
    gatewayTransactionId,
    message,
    metadata,
  } = data;
 
  if (!orderId) {
    errors.push("Order ID is required");
  }

  if (!paymentId) {
    errors.push("Payment ID is required");
  }

  if (!userId) {
    errors.push("User ID is required");
  }
 
  if (
    typeof amount !== "number" ||
    amount < 0
  ) {
    errors.push("Amount must be a valid number");
  }
 
 
  if (
    !Object.values(TRANSACTION_TYPE).includes(type)
  ) {
    errors.push("Invalid transaction type");
  }

 
  if (
    status &&
    !Object.values(TRANSACTION_STATUS).includes(status)
  ) {
    errors.push("Invalid transaction status");
  }

 
  if (
    gateway &&
    !Object.values(PAYMENT_GATEWAY).includes(gateway)
  ) {
    errors.push("Invalid payment gateway");
  }

 
  if (
    gatewayTransactionId &&
    typeof gatewayTransactionId !== "string"
  ) {
    errors.push("Gateway transaction ID must be a string");
  }

  if (message && typeof message !== "string") {
    errors.push("Message must be a string");
  }

 
  if (
    metadata &&
    typeof metadata !== "object"
  ) {
    errors.push("Metadata must be an object");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateTransaction,
};