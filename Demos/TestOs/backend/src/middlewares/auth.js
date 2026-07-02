const { verifyTokenString } = require("../utils/tokenHelpers");
const { AppError } = require("./errorHandler");
const log = require("../utils/logger");

const verifyToken = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("No token provided", 401);
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyTokenString(token);

      if (roles.length > 0) {
        const role = decoded.sRole || decoded.role;
        if (!roles.includes(role)) {
          throw new AppError("Access denied — wrong hat for this kitchen", 403);
        }
      }

      log.auth(`Token verified for ${decoded.sRole || decoded.role}. The velvet rope opens.`);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        log.warn("Expired or forged token spotted. Nice try, sneaky snack thief.");
        return next(new AppError("Invalid or expired token", 401));
      }
      next(error);
    }
  };
};

module.exports = { verifyToken };
