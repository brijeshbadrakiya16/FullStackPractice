const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const Manage = require("../models/Manage");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Item = require("../models/Item");
const Category = require("../models/Category");
const { deleteFromImgbb } = require("../utils/imgbbUploader");
const { AppError } = require("../middlewares/errorHandler");
const log = require("../utils/logger");
const { platformFeeField, restaurantNetField } = require("../utils/platformFee");

const orderProfitStages = [
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
      nCostAmount: {
        $reduce: {
          input: {
            $map: {
              input: "$aItems",
              as: "oi",
              in: {
                $multiply: [
                  {
                    $let: {
                      vars: {
                        matched: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$itemDetails",
                                as: "d",
                                cond: { $eq: ["$$d._id", "$$oi.iItemId"] },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: { $ifNull: ["$$matched.nOriginalPrice", 0] },
                    },
                  },
                  "$$oi.count",
                ],
              },
            },
          },
          initialValue: 0,
          in: { $add: ["$$value", "$$this"] },
        },
      },
      nRestaurantNetCalc: restaurantNetField,
      nPlatformFeeCalc: platformFeeField,
    },
  },
  {
    $addFields: {
      nProfit: { $subtract: ["$nRestaurantNetCalc", "$nCostAmount"] },
    },
  },
];

const getStats = async (req, res, next) => {
  try {
    log.admin("SuperAdmin wants the numbers. Crunching data like a caffeinated accountant...");

    const [activeRestaurants, activeCustomers, totalOrders, itemsServed, revenue] =
      await Promise.all([
        Manage.countDocuments({ bService: true }),
        Customer.countDocuments({ bActive: true }),
        Order.countDocuments(),
        Order.aggregate([{ $group: { _id: null, total: { $sum: "$nItemsCount" } } }]),
        Order.aggregate([{ $group: { _id: null, total: { $sum: platformFeeField } } }]),
      ]);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const topRestaurantOfMonth = await Order.aggregate([
      { $match: { dOrderDate: { $gte: startOfMonth } } },
      { $group: { _id: "$iRestaurantId", nOrderCount: { $sum: 1 } } },
      { $sort: { nOrderCount: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "restaurants",
          localField: "_id",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      { $unwind: "$restaurant" },
      { $project: { sName: "$restaurant.sName", nOrderCount: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        nActiveRestaurants: activeRestaurants,
        nActiveCustomers: activeCustomers,
        nTotalOrders: totalOrders,
        nTotalItemsServed: itemsServed[0]?.total || 0,
        nTotalPlatformRevenue: revenue[0]?.total || 0,
        topRestaurantOfMonth: topRestaurantOfMonth[0] || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Manage.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "iRestaurantId",
          foreignField: "iRestaurantId",
          as: "orders",
        },
      },
      {
        $addFields: {
          nFeesCollected: {
            $sum: {
              $map: {
                input: "$orders",
                as: "o",
                in: { $ifNull: ["$$o.nPlatformFee", { $ifNull: ["$$o.nChange", 0] }] },
              },
            },
          },
        },
      },
      { $sort: { nFeesCollected: -1 } },
      {
        $lookup: {
          from: "restaurants",
          localField: "iRestaurantId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      { $unwind: "$restaurant" },
      {
        $project: {
          restaurant: {
            _id: "$restaurant._id",
            sName: "$restaurant.sName",
            sEmail: "$restaurant.sEmail",
            sAddress: "$restaurant.sAddress",
            sContactNumber: "$restaurant.sContactNumber",
            sQrUrl: "$restaurant.sQrUrl",
            nDiscountPercentage: "$restaurant.nDiscountPercentage",
          },
          manage: {
            nChange: "$nChange",
            bAddProduct: "$bAddProduct",
            bUpdateProduct: "$bUpdateProduct",
            bRemoveProduct: "$bRemoveProduct",
            bService: "$bService",
            nOrders: "$nOrders",
            nProfit: "$nFeesCollected",
            bInProgress: "$bInProgress",
            sName: "$sName",
          },
        },
      },
    ]);

    res.json({ success: true, data: restaurants });
  } catch (error) {
    next(error);
  }
};

const updateManage = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const allowedFields = [
      "bAddProduct",
      "bUpdateProduct",
      "bRemoveProduct",
      "bService",
      "bInProgress",
      "nChange",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = field === "nChange" ? Number(req.body[field]) : req.body[field];
      }
    });

    const manage = await Manage.findOneAndUpdate({ iRestaurantId: restaurantId }, updates, {
      new: true,
    });

    if (!manage) throw new AppError("Manage record not found", 404);

    res.json({ success: true, data: manage });
  } catch (error) {
    next(error);
  }
};

const updateRestaurantCredentials = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sEmail, sPassword } = req.body;
    const updates = {};

    if (sEmail) {
      if (!validator.isEmail(sEmail)) throw new AppError("Invalid email format", 400);
      updates.sEmail = sEmail;
    }

    if (sPassword) {
      updates.sPassword = await bcrypt.hash(sPassword, 10);
    }

    const restaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true }).select(
      "-sPassword"
    );

    if (!restaurant) throw new AppError("Restaurant not found", 404);

    res.json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new AppError("Restaurant not found", 404);

    await deleteFromImgbb(restaurant.sQrDeleteUrl);

    const items = await Item.find({ iRestaurantId: id });
    for (const item of items) {
      await deleteFromImgbb(item.sDeleteImageUrl);
    }

    await Promise.all([
      Item.deleteMany({ iRestaurantId: id }),
      Category.deleteMany({ iRestaurantId: id }),
      Order.deleteMany({ iRestaurantId: id }),
      Manage.deleteOne({ iRestaurantId: id }),
      Restaurant.deleteOne({ _id: id }),
    ]);

    res.json({ success: true, message: "Restaurant deleted" });
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "iCustomerId",
          as: "orders",
        },
      },
      {
        $project: {
          sName: 1,
          sEmail: 1,
          sContactNumber: 1,
          bActive: 1,
          nTotalOrders: { $size: "$orders" },
          dLastOrderDate: { $max: "$orders.dOrderDate" },
        },
      },
      { $sort: { sName: 1 } },
    ]);

    res.json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
};

const getCustomerOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orders = await Order.aggregate([
      { $match: { iCustomerId: new mongoose.Types.ObjectId(id) } },
      { $sort: { dOrderDate: -1 } },
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
      { $project: { itemDetails: 0 } },
    ]);

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bActive, sName, sContactNumber } = req.body;
    const updates = {};

    if (bActive !== undefined) updates.bActive = bActive;
    if (sName) updates.sName = sName;
    if (sContactNumber) updates.sContactNumber = sContactNumber;

    const customer = await Customer.findByIdAndUpdate(id, updates, { new: true }).select(
      "-sPassword"
    );

    if (!customer) throw new AppError("Customer not found", 404);

    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.deleteMany({ iCustomerId: id });
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) throw new AppError("Customer not found", 404);

    res.json({ success: true, message: "Customer deleted" });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const {
      sortBy = "latest",
      restaurantId,
      customerId,
      minItems,
      maxItems,
      dateFrom,
      dateTo,
      page = 1,
      limit = 20,
    } = req.query;

    const match = {};
    if (restaurantId) match.iRestaurantId = new mongoose.Types.ObjectId(restaurantId);
    if (customerId) match.iCustomerId = new mongoose.Types.ObjectId(customerId);
    if (minItems || maxItems) {
      match.nItemsCount = {};
      if (minItems) match.nItemsCount.$gte = Number(minItems);
      if (maxItems) match.nItemsCount.$lte = Number(maxItems);
    }
    if (dateFrom || dateTo) {
      match.dOrderDate = {};
      if (dateFrom) match.dOrderDate.$gte = new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        match.dOrderDate.$lte = end;
      }
    }

    const sortMap = {
      latest: { dOrderDate: -1 },
      oldest: { dOrderDate: 1 },
      amount_high: { nFinalPrice: -1 },
      amount_low: { nFinalPrice: 1 },
      items_high: { nItemsCount: -1 },
      items_low: { nItemsCount: 1 },
      profit_high: { nProfit: -1 },
      profit_low: { nProfit: 1 },
      customer: { "customer.sName": 1 },
    };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const pipeline = [
      { $match: match },
      ...orderProfitStages,
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
          from: "customers",
          localField: "iCustomerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
      { $sort: sortMap[sortBy] || sortMap.latest },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limitNum },
            {
              $project: {
                itemDetails: 0,
                "restaurant.sPassword": 0,
                "customer.sPassword": 0,
              },
            },
          ],
          total: [{ $count: "count" }],
        },
      },
    ];

    const [result] = await Order.aggregate(pipeline);
    const orders = result.data || [];
    const total = result.total[0]?.count || 0;

    res.json({
      success: true,
      data: {
        orders,
        total,
        page: pageNum,
        hasMore: skip + orders.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
