function validateCartItem(data) {
  const errors = [];

  const {
    productId,
    variantId,
    quantity,
  } = data;

  if (!productId) {
    errors.push("Product ID is required");
  }

  if (!variantId) {
    errors.push("Variant ID is required");
  }

  if (quantity === undefined || quantity === null) {
    errors.push("Quantity is required");
  } else if (
    typeof quantity !== "number" ||
    !Number.isInteger(quantity)
  ) {
    errors.push("Quantity must be an integer");
  } else if (quantity < 1) {
    errors.push("Quantity must be at least 1");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateCartItem,
};