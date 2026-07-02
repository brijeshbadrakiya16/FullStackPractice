const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn = process.env.JWT_EXPIRY) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const generateAdminToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.SUPER_ADMIN_JWT_EXPIRY,
  });
};

const verifyTokenString = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, generateAdminToken, verifyTokenString };
