function validateOrderItem(data) {
  const errors = [];

  const {
    productId,
    variantId,
    sellerId,
    productName,
    sku,
    unitPrice,
    quantity,
  } = data;

  if (!productId) {
    errors.push("Product ID is required");
  }

  if (!variantId) {
    errors.push("Variant ID is required");
  }

  if (!sellerId) {
    errors.push("Seller ID is required");
  }

  if (!productName?.trim()) {
    errors.push("Product name is required");
  }

  if (!sku?.trim()) {
    errors.push("SKU is required");
  }

  if (typeof unitPrice !== "number" || unitPrice <= 0) {
    errors.push("Unit price must be greater than 0");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push("Quantity must be at least 1");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateOrderItem,
};