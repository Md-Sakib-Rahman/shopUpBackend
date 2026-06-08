function validateSellerApplication(data) {
  const errors = [];

  if (!data.shopName?.trim()) {
    errors.push("Shop name is required");
  }

  if (!data.businessType?.trim()) {
    errors.push("Business type is required");
  }

  if (!data.bkashNumber?.trim()) {
    errors.push("Bkash number is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateSellerApplication,
};