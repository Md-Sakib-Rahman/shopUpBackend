const { validateCartItem } = require("./cart-item.validator");

function validateCart(data) {
  const errors = [];

  const { userId, items } = data;

  if (!userId) {
    errors.push("User ID is required");
  }

  if (items && !Array.isArray(items)) {
    errors.push("Items must be an array");
  }
  if (Array.isArray(items)) {
  items.forEach((item, index) => {
    const result = validateCartItem(item);

    if (!result.isValid) {
      result.errors.forEach((error) => {
        errors.push(`Item ${index + 1}: ${error}`);
      });
    }
  });
}
  

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateCart
};
