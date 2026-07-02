const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { ipGuard } = require("../middlewares/ipGuard");
const {
  getStats,
  getRestaurants,
  updateManage,
  updateRestaurantCredentials,
  deleteRestaurant,
  getCustomers,
  getCustomerOrders,
  updateCustomer,
  deleteCustomer,
  getAllOrders,
} = require("../controllers/adminController");

const router = express.Router();

router.use(ipGuard);
router.use(verifyToken(["superadmin"]));

router.get("/stats", getStats);
router.get("/orders", getAllOrders);
router.get("/restaurants", getRestaurants);
router.patch("/manage/:restaurantId", updateManage);
router.patch("/restaurant/:id/credentials", updateRestaurantCredentials);
router.delete("/restaurant/:id", deleteRestaurant);
router.get("/customers", getCustomers);
router.get("/customer/:id/orders", getCustomerOrders);
router.patch("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);

module.exports = router;
