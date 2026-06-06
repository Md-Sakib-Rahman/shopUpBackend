
const { ORDER_STATUS, PAYMENT_STATUS } = require("./enums/order.enums");

class Order {
  constructor({
    userId,

    items = [],

    shippingAddress,

    paymentMethod,

    paymentStatus = PAYMENT_STATUS.PENDING,

    statusHistory,

    subtotal = 0,

    discount = 0,

    shippingFee = 0,

    total = 0,

    notes = "",
  }) {
    this.userId = userId;

    this.items = items;

    this.shippingAddress = shippingAddress;

    this.paymentMethod = paymentMethod;

    this.paymentStatus = paymentStatus;

    this.statusHistory = statusHistory || [
      {
        status: ORDER_STATUS.PENDING,
        timestamp: new Date(),
      },
    ];

    this.orderStatus =
      this.statusHistory[this.statusHistory.length - 1].status;

    this.subtotal = subtotal;

    this.discount = discount;

    this.shippingFee = shippingFee;

    this.total = total;

    this.notes = notes;

    this.createdAt = new Date();

    this.updatedAt = new Date();
  }

    addStatus(status) {
    if (!Object.values(ORDER_STATUS).includes(status)) {
      throw new Error("Invalid order status");
    }

    this.statusHistory.push({
      status,
      timestamp: new Date(),
    });

    this.orderStatus = status;
    this.updatedAt = new Date();
  }
}

module.exports = Order;