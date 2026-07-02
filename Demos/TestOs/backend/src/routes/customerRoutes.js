const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const {
  getProfile,
  updateProfile,
  getOrders,
  getDueOrders,
} = require("../controllers/customerController");
const { ROLES } = require("../config/constants");

const router = express.Router();

router.use(verifyToken([ROLES.CUSTOMER]));

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);
router.get("/orders", getOrders);
router.get("/orders/due", getDueOrders);

module.exports = router;
