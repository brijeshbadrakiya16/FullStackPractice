const mongoose = require("mongoose");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const { AppError } = require("../middlewares/errorHandler");
const log = require("../utils/logger");

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

const getProfile = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-sPassword");
    if (!customer) throw new AppError("Customer not found", 404);

    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { sName, sContactNumber } = req.body;
    const updates = {};

    if (sName) updates.sName = sName;
    if (sContactNumber) {
      const existing = await Customer.findOne({ sContactNumber, _id: { $ne: req.user.id } });
      if (existing) throw new AppError("Contact number already in use", 409);
      updates.sContactNumber = sContactNumber;
    }

    const customer = await Customer.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-sPassword");

    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

const getOrdersWithDetails = async (filter) => {
  return Order.aggregate([
    { $match: filter },
    { $sort: { dOrderDate: -1 } },
    {
      $lookup: {
        from: "restaurants",
        localField: "iRestaurantId",
        foreignField: "_id",
        as: "restaurant",
      },
    },
    { $unwind: { path: "$restaurant", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "items",
        localField: "aItems.iItemId",
        foreignField: "_id",
        as: "itemDetails",
      },
    },
    {
      $addFields: {
        aItems: {
          $map: {
            input: "$aItems",
            as: "orderItem",
            in: {
              count: "$$orderItem.count",
              item: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$itemDetails",
                      as: "detail",
                      cond: { $eq: ["$$detail._id", "$$orderItem.iItemId"] },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
    {
      $project: {
        itemDetails: 0,
        "restaurant.sPassword": 0,
      },
    },
  ]);
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await getOrdersWithDetails({ iCustomerId: toObjectId(req.user.id) });
    log.order(`Fetched ${orders.length} orders for customer ${req.user.id}`);
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

const getDueOrders = async (req, res, next) => {
  try {
    const orders = await getOrdersWithDetails({
      iCustomerId: toObjectId(req.user.id),
      eStatus: "due",
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, getOrders, getDueOrders };
