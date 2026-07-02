const { AppError } = require("./errorHandler");
const log = require("../utils/logger");

const ipGuard = (req, res, next) => {

  log.admin("Someone knocked on the SuperAdmin door. Checking the VIP list...");

  let normalizedIp;
  fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      normalizedIp = data.ip;

      // console.log(normalizedIp, String(process.env.SUPER_ADMIN_IP));

      if (!process.env.SUPER_ADMIN_IP.split(",").includes(normalizedIp)) {
        log.warn(`IP ${normalizedIp} tried the back door. Bouncer says NOPE.`);
        return next(new AppError("Access denied — your IP is not on the VIP list", 403));
      }  
      log.success(`VIP IP ${normalizedIp} cleared the velvet rope.`, "BOUNCER");
      next();
    })
    .catch(error => {
      return next(new AppError("You are secure then ever, as we could not get your IP address", 500));
    });
};

module.exports = { ipGuard };
