const {
  TRANSACTION_TYPE,
  TRANSACTION_STATUS,
  PAYMENT_GATEWAY,
} = require("../enums/transaction.enums");

class Transaction {
  constructor({
    orderId,
    paymentId,
    userId,

    amount,

    type,

    status = TRANSACTION_STATUS.PENDING,

    gateway = PAYMENT_GATEWAY.SSLCOMMERZ,

    gatewayTransactionId = null,

    message = null,

    metadata = {},
  }) {
    if (!Object.values(TRANSACTION_TYPE).includes(type)) {
      throw new Error("Invalid transaction type");
    }

    if (!Object.values(TRANSACTION_STATUS).includes(status)) {
      throw new Error("Invalid transaction status");
    }

    if (!Object.values(PAYMENT_GATEWAY).includes(gateway)) {
      throw new Error("Invalid gateway");
    }

    this.orderId = orderId;

    this.paymentId = paymentId;

    this.userId = userId;

    this.amount = amount;

    this.type = type;

    this.status = status;

    this.gateway = gateway;

    this.gatewayTransactionId = gatewayTransactionId;

    this.message = message;

    this.metadata = metadata;

    this.createdAt = new Date();
  }
}

module.exports = Transaction;