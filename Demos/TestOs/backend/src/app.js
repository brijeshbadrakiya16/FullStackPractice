const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const publicRoutes = require("./routes/publicRoutes");
const { errorHandler } = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");

const app = express();

app.set("trust proxy", true);
app.use(requestLogger);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Kitchen is open for business! 🍽️" });
});

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.use(errorHandler);

module.exports = app;
