const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  getMenu,
  getMenuItems,
  getDashboard,
  getOrders,
  finishOrder,
  addCategory,
  addItem,
  updateItem,
  deleteItem,
  updateSettings,
} = require("../controllers/restaurantController");
const { ROLES } = require("../config/constants");

const router = express.Router();

router.get("/:id/menu", verifyToken([ROLES.CUSTOMER, ROLES.RESTAURANT]), getMenu);
router.get("/:id/menu/items", verifyToken([ROLES.CUSTOMER, ROLES.RESTAURANT]), getMenuItems);
router.get("/:id/dashboard", verifyToken([ROLES.RESTAURANT]), getDashboard);
router.get("/:id/orders", verifyToken([ROLES.RESTAURANT]), getOrders);
router.patch("/:id/orders/:orderId", verifyToken([ROLES.RESTAURANT]), finishOrder);
router.post("/:id/category", verifyToken([ROLES.RESTAURANT]), addCategory);
router.post("/:id/item", verifyToken([ROLES.RESTAURANT]), upload.single("image"), addItem);
router.patch("/:id/item/:itemId", verifyToken([ROLES.RESTAURANT]), upload.single("image"), updateItem);
router.delete("/:id/item/:itemId", verifyToken([ROLES.RESTAURANT]), deleteItem);
router.patch("/:id/settings", verifyToken([ROLES.RESTAURANT]), updateSettings);

module.exports = router;
