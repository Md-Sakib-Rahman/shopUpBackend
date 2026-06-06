const { ORDER_STATUS, PAYMENT_STATUS } =
  require("../models/enums/order.enums");

const { validateAddress } =
  require("./address.validator");

const { validateOrderItem } =
  require("./order-item.validator");

function validateOrder(data) {
  const errors = [];

  const {
    userId,
    items,
    shippingAddress,
    paymentMethod,
    paymentStatus,
    statusHistory,
    subtotal,
    discount,
    shippingFee,
    total,
    notes,
  } = data;


  if (!userId) {
    errors.push("User ID is required");
  }


  if (!Array.isArray(items) || items.length === 0) {
    errors.push("Order must contain items");
  }

  if (Array.isArray(items)) {
    items.forEach((item, index) => {
      const result = validateOrderItem(item);

      if (!result.isValid) {
        result.errors.forEach((err) => {
          errors.push(`Item ${index + 1}: ${err}`);
        });
      }
    });
  }


  if (!shippingAddress) {
    errors.push("Shipping address is required");
  } else {
    const addressResult = validateAddress(shippingAddress);

    if (!addressResult.isValid) {
      addressResult.errors.forEach((err) => {
        errors.push(`Address: ${err}`);
      });
    }
  }


  const allowedPaymentMethods = [
    "bkash",
    "nagad",
    "sslcommerz",
    "card",
    "stripe",
  ];

  if (!allowedPaymentMethods.includes(paymentMethod)) {
    errors.push("Invalid payment method");
  }


  if (
    paymentStatus &&
    !Object.values(PAYMENT_STATUS).includes(paymentStatus)
  ) {
    errors.push("Invalid payment status");
  }


  if (statusHistory && !Array.isArray(statusHistory)) {
    errors.push("Status history must be an array");
  }


  if (subtotal !== undefined && subtotal < 0) {
    errors.push("Subtotal cannot be negative");
  }

  if (discount !== undefined && discount < 0) {
    errors.push("Discount cannot be negative");
  }

  if (shippingFee !== undefined && shippingFee < 0) {
    errors.push("Shipping fee cannot be negative");
  }

  if (total !== undefined && total < 0) {
    errors.push("Total cannot be negative");
  }

  if (notes && typeof notes !== "string") {
    errors.push("Notes must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateOrder,
};