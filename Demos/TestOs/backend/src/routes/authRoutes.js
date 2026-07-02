const express = require("express");
const {
  registerCustomer,
  loginCustomer,
  registerRestaurant,
  loginRestaurant,
  loginAdmin,
} = require("../controllers/authController");
const { ipGuard } = require("../middlewares/ipGuard");

const router = express.Router();

router.post("/customer/register", registerCustomer);
router.post("/customer/login", loginCustomer);
router.post("/restaurant/register", registerRestaurant);
router.post("/restaurant/login", loginRestaurant);
router.post("/admin/login", ipGuard, loginAdmin);

module.exports = router;
