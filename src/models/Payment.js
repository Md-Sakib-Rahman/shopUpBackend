const { PAYMENT_METHOD } = require("./enums/payment.enums");
const {PAYMENT_STATUS} = require("./enums/order.enums");

class Payment {
  constructor({
    orderId,
    userId,

    amount,

    method,

    status = PAYMENT_STATUS.PENDING,

    provider = "sslcommerz",

    providerTransactionId = null,

    sessionId = null,
  }) {
    if (!Object.values(PAYMENT_METHOD).includes(method)) {
      throw new Error("Invalid payment method");
    }

    if (!Object.values(PAYMENT_STATUS).includes(status)) {
      throw new Error("Invalid payment status");
    }

    this.orderId = orderId;
    this.userId = userId;

    this.amount = amount;

    this.method = method;

    this.status = status;

    this.provider = provider;

    this.providerTransactionId = providerTransactionId;

    this.sessionId = sessionId;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  markSuccess(transactionId) {
    this.status = PAYMENT_STATUS.PAID;
    this.providerTransactionId = transactionId;
    this.updatedAt = new Date();
  }

  markFailed() {
    this.status = PAYMENT_STATUS.FAILED;
    this.updatedAt = new Date();
  }
}

module.exports = Payment;