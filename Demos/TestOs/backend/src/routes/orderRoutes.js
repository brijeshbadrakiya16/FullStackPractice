const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { placeOrder } = require("../controllers/orderController");
const { ROLES } = require("../config/constants");

const router = express.Router();

router.post("/", verifyToken([ROLES.CUSTOMER]), placeOrder);

module.exports = router;
