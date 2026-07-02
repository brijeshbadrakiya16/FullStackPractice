const mongoose = require("mongoose");
const log = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    log.db("MongoDB connected — the kitchen database is hot, seasoned, and ready to serve!");
  } catch (error) {
    log.error(`MongoDB connection failed. The kitchen is literally on fire: ${error.message}`, "FIRE");
    process.exit(1);
  }
};

module.exports = connectDB;
