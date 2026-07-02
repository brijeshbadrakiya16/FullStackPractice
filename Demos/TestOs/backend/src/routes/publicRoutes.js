const express = require("express");
const { getStats, getRestaurantPublic } = require("../controllers/publicController");

const router = express.Router();

router.get("/stats", getStats);
router.get("/restaurant/:id", getRestaurantPublic);

module.exports = router;
