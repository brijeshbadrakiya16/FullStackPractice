export const validateEmail = (email) => {
  if (!email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address";
  return null;
};

export const validatePassword = (password, min = 6) => {
  if (!password) return "Password is required";
  if (password.length < min) return `Password must be at least ${min} characters`;
  return null;
};

export const validateContact = (contact) => {
  if (!contact?.trim()) return "Contact number is required";
  const cleaned = contact.replace(/\s/g, "");
  if (!/^[+]?[\d]{10,10}$/.test(cleaned)) return "Enter a valid 10–15 digit number";
  return null;
};

export const validateName = (name, label = "Name") => {
  if (!name?.trim()) return `${label} is required`;
  if (name.trim().length < 2) return `${label} must be at least 2 characters`;
  return null;
};

export const validateRequired = (value, label) => {
  if (!value?.trim()) return `${label} is required`;
  return null;
};
