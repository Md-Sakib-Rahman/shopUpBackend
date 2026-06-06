function validateRegister(data) {
  const errors = [];

  
  if (!data.name?.trim()) {
    errors.push("Name is required");
  }
  if (!data.email?.trim()) {
    errors.push("Email is required");
  }
  
  const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;

  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push("Invalid phone number");
  }
  if (!data.password) {
    errors.push("Password is required");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Email Format is incorrect ! ");
  }
  if (data.password && data.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

function validateLogin(data) {
  const errors = [];

  if (!data.password) {
    errors.push("Password is required");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateRegister,
  validateLogin,
};
