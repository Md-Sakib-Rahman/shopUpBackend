const { validateAddress } = require("./address.validator");

function validateUserAddresses(data) {
  const errors = [];

  const { addresses } = data;

  if (!Array.isArray(addresses)) {
    errors.push("Addresses must be an array");
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  if (addresses.length === 0) {
    return {
      isValid: true,
      errors: [],
    };
  }

  addresses.forEach((address, index) => {
    const result = validateAddress(address);

    if (!result.isValid) {
      result.errors.forEach((error) => {
        errors.push(`Address ${index + 1}: ${error}`);
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateUserAddresses,
};