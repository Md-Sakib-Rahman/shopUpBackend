const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;

function validateAddress(data) {
  const errors = [];

  const {
    label,
    fullName,
    phone,
    country,
    division,
    district,
    upazila,
    area,
    addressLine1,
    addressLine2,
    postalCode,
    isDefault,
  } = data;


  if (!label?.trim()) {
    errors.push("Address label is required");
  }

  if (!fullName?.trim()) {
    errors.push("Full name is required");
  }

  if (!phone?.trim()) {
    errors.push("Phone number is required");
  }

  if (!division?.trim()) {
    errors.push("Division is required");
  }

  if (!district?.trim()) {
    errors.push("District is required");
  }

  if (!upazila?.trim()) {
    errors.push("Upazila is required");
  }

  if (!area?.trim()) {
    errors.push("Area is required");
  }

  if (!addressLine1?.trim()) {
    errors.push("Address Line 1 is required");
  }


  if (phone && !phoneRegex.test(phone)) {
    errors.push("Invalid phone number");
  }


  if (country && typeof country !== "string") {
    errors.push("Country must be a string");
  }


  if (
    postalCode !== null &&
    postalCode !== undefined &&
    typeof postalCode !== "string"
  ) {
    errors.push("Postal code must be a string");
  }


  if (
    isDefault !== undefined &&
    typeof isDefault !== "boolean"
  ) {
    errors.push("isDefault must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateAddress,
};