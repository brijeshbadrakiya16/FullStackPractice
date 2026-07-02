const log = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  log.error(`${req.method} ${req.originalUrl} → ${err.message}`, statusCode >= 500 ? "CRASH" : "NOPE");

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    errors: err.errors || undefined,
    statusCode,
  });
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = { errorHandler, AppError };
