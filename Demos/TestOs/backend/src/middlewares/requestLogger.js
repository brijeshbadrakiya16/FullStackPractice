const log = require("../utils/logger");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    log.request(req, res.statusCode, duration);
  });

  next();
};

module.exports = requestLogger;
