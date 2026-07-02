const Restaurant = require("../models/Restaurant");
const Manage = require("../models/Manage");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Item = require("../models/Item");
const { AppError } = require("../middlewares/errorHandler");

const getStats = async (req, res, next) => {
  try {
    const [activeRestaurants, totalCustomers, totalOrders, itemsServed, menuItemsLive] =
      await Promise.all([
        Manage.countDocuments({ bService: true }),
        Customer.countDocuments({ bActive: true }),
        Order.countDocuments(),
        Order.aggregate([{ $group: { _id: null, total: { $sum: "$nItemsCount" } } }]),
        Item.countDocuments({ bAvailable: true }),
      ]);

    res.json({
      success: true,
      data: {
        nActiveRestaurants: activeRestaurants,
        nTotalCustomers: totalCustomers,
        nTotalOrders: totalOrders,
        nTotalItemsServed: itemsServed[0]?.total || 0,
        nMenuItemsLive: menuItemsLive,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurantPublic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const manage = await Manage.findOne({ iRestaurantId: id });

    if (!manage || !manage.bService) {
      throw new AppError("Restaurant not found", 404);
    }

    const restaurant = await Restaurant.findById(id).select(
      "sName sAddress nDiscountPercentage sQrUrl"
    );

    if (!restaurant) throw new AppError("Restaurant not found", 404);

    res.json({
      success: true,
      data: {
        ...restaurant.toObject(),
        manage: {
          bService: manage.bService,
          bInProgress: manage.bInProgress,
          nChange: manage.nChange,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats, getRestaurantPublic };
