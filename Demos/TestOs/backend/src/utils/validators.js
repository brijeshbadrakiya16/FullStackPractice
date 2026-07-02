const validator = require("validator");
const { AppError } = require("../middlewares/errorHandler");

const validateEmail = (email) => {
  if (!email || !validator.isEmail(String(email).trim())) {
    throw new AppError("Please enter a valid email address", 400);
  }
  return String(email).trim().toLowerCase();
};

const validatePassword = (password, { min = 6, label = "Password" } = {}) => {
  if (!password || String(password).length < min) {
    throw new AppError(`${label} must be at least ${min} characters`, 400);
  }
  return String(password);
};

const validateRequired = (value, fieldName) => {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new AppError(`${fieldName} is required`, 400);
  }
  return String(value).trim();
};

const validateContactNumber = (contact) => {
  const cleaned = validateRequired(contact, "Contact number").replace(/\s/g, "");
  if (!/^[+]?[\d]{10,15}$/.test(cleaned)) {
    throw new AppError("Contact number must be 10–15 digits", 400);
  }
  return cleaned;
};

const validateName = (name, fieldName = "Name") => {
  const value = validateRequired(name, fieldName);
  if (value.length < 2 || value.length > 80) {
    throw new AppError(`${fieldName} must be between 2 and 80 characters`, 400);
  }
  return value;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateRequired,
  validateContactNumber,
  validateName,
};
