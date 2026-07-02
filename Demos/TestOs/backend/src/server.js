require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const log = require("./utils/logger");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT,"0.0.0.0", (server) => {
    log.funny("🚀", `Server sizzling on port ${PORT} — orders incoming, aprons on!`);
  });
});
