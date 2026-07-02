const mongoose = require("mongoose");
const Category = require("../models/Category");
const Item = require("../models/Item");
const Order = require("../models/Order");
const Manage = require("../models/Manage");
const Restaurant = require("../models/Restaurant");
const { uploadToImgbb, deleteFromImgbb } = require("../utils/imgbbUploader");
const { AppError } = require("../middlewares/errorHandler");
const { ORDER_STATUS } = require("../config/constants");
const log = require("../utils/logger");
const { platformFeeField, restaurantNetField } = require("../utils/platformFee");

const profitStages = [
  {
    $addFields: {
      nCostAmount: {
        $reduce: {
          input: "$aItems",
          initialValue: 0,
          in: {
            $add: [
              "$$value",
              {
                $multiply: [
                  { $ifNull: ["$$this.item.nOriginalPrice", 0] },
                  "$$this.count",
                ],
              },
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      nRestaurantNet: restaurantNetField,
      nPlatformFeeSnapshot: platformFeeField,
    },
  },
  {
    $addFields: {
      nProfit: { $subtract: ["$nRestaurantNet", "$nCostAmount"] },
    },
  },
];

const verifyRestaurantAccess = async (restaurantId, userId) => {
  if (restaurantId !== userId.toString()) {
    throw new AppError("Access denied to this restaurant", 403);
  }
};

const ensureRestaurantService = (manage) => {
  if (!manage?.bService) {
    throw new AppError("Service not activated. Awaiting SuperAdmin approval.", 403);
  }
};

const verifyRestaurantOwner = async (restaurantId, userId) => {
  await verifyRestaurantAccess(restaurantId, userId);
  const manage = await Manage.findOne({ iRestaurantId: restaurantId });
  ensureRestaurantService(manage);
  return manage;
};

const getMenuAggregation = (restaurantId, includeOriginalPrice = false) => {
  const itemProject = {
    sName: 1,
    sImageUrl: 1,
    sDescription: 1,
    nStock: 1,
    bAvailable: 1,
    nSalePrice: 1,
    iCategoryId: 1,
    iRestaurantId: 1,
  };

  if (includeOriginalPrice) {
    itemProject.nOriginalPrice = 1;
  }

  return Category.aggregate([
    { $match: { iRestaurantId: new mongoose.Types.ObjectId(restaurantId) } },
    {
      $lookup: {
        from: "items",
        let: { catId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$iCategoryId", "$$catId"] },
                  { $eq: ["$iRestaurantId", new mongoose.Types.ObjectId(restaurantId)] },
                ],
              },
            },
          },
          { $project: itemProject },
        ],
        as: "items",
      },
    },
    { $project: { sName: 1, iRestaurantId: 1, items: 1 } },
  ]);
};

const getMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isRestaurant = req.user.sRole === "restaurant";
    const includeOriginalPrice = isRestaurant && req.user.id === id;

    const manage = await Manage.findOne({ iRestaurantId: id });
    if (!manage) throw new AppError("Restaurant not found", 404);

    if (isRestaurant) {
      await verifyRestaurantAccess(id, req.user.id);
      ensureRestaurantService(manage);
    }

    let categories = await getMenuAggregation(id, includeOriginalPrice);

    if (!isRestaurant) {
      categories = categories.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.bAvailable),
      }));
    }

    const response = { categories, manage };

    if (isRestaurant && includeOriginalPrice) {
      const restaurant = await Restaurant.findById(id).select("sName sAddress sQrUrl nDiscountPercentage");
      response.restaurant = restaurant;
    }

    res.json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const { id } = req.params;
    await verifyRestaurantOwner(id, req.user.id);

    const restaurantObjectId = new mongoose.Types.ObjectId(id);
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const restaurant = await Restaurant.findById(id).select("nDiscountPercentage sName");
    const nDueOrders = await Order.countDocuments({
      iRestaurantId: id,
      eStatus: ORDER_STATUS.DUE,
    });

    const [stats] = await Order.aggregate([
      { $match: { iRestaurantId: restaurantObjectId } },
      {
        $facet: {
          finished: [
            { $match: { eStatus: ORDER_STATUS.FINISHED } },
            {
              $group: {
                _id: null,
                nTotalOrders: { $sum: 1 },
                nTotalCollected: { $sum: "$nFinalPrice" },
                nTotalPlatformFees: { $sum: platformFeeField },
                nTotalRevenue: { $sum: restaurantNetField },
                nTotalItemsServed: { $sum: "$nItemsCount" },
                aCustomers: { $addToSet: "$iCustomerId" },
              },
            },
          ],
          profit: [
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
            ...profitStages,
            {
              $group: {
                _id: null,
                nTotalProfit: { $sum: "$nProfit" },
              },
            },
          ],
          topCustomer: [
            {
              $match: {
                dOrderDate: { $gte: startOfMonth },
              },
            },
            {
              $group: {
                _id: "$iCustomerId",
                nOrderCount: { $sum: 1 },
              },
            },
            { $sort: { nOrderCount: -1 } },
            { $limit: 1 },
            {
              $lookup: {
                from: "customers",
                localField: "_id",
                foreignField: "_id",
                as: "customer",
              },
            },
            { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
          ],
        },
      },
    ]);

    const finished = stats.finished[0] || {
      nTotalOrders: 0,
      nTotalRevenue: 0,
      nTotalCollected: 0,
      nTotalPlatformFees: 0,
      nTotalItemsServed: 0,
      aCustomers: [],
    };

    const topCustomer = stats.topCustomer[0];
    const profit = stats.profit[0] || { nTotalProfit: 0 };
    const nAvgOrderValue =
      finished.nTotalOrders > 0 ? finished.nTotalRevenue / finished.nTotalOrders : 0;

    log.info(`Dashboard stats served for ${restaurant.sName}`, "DASHBOARD");

    res.json({
      success: true,
      data: {
        nTotalOrdersFinished: finished.nTotalOrders,
        nDistinctCustomers: finished.aCustomers.length,
        nTotalItemsServed: finished.nTotalItemsServed,
        nRevenue: finished.nTotalRevenue,
        nTotalCollected: finished.nTotalCollected,
        nTotalPlatformFees: finished.nTotalPlatformFees,
        nTotalProfit: profit.nTotalProfit,
        nDueOrders,
        nDiscountPercentage: restaurant.nDiscountPercentage,
        nAvgOrderValue,
        topCustomerOfMonth: topCustomer
          ? { sName: topCustomer.customer?.sName, nOrderCount: topCustomer.nOrderCount }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { eStatus, sortBy = "latest", customerId } = req.query;
    await verifyRestaurantOwner(id, req.user.id);

    const match = { iRestaurantId: new mongoose.Types.ObjectId(id) };
    if (eStatus) match.eStatus = eStatus;
    if (customerId) match.iCustomerId = new mongoose.Types.ObjectId(customerId);

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

    const orders = await Order.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "customers",
          localField: "iCustomerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
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
      ...profitStages,
      { $sort: sortMap[sortBy] || sortMap.latest },
      {
        $project: {
          itemDetails: 0,
          "customer.sPassword": 0,
        },
      },
    ]);

    const nTotalProfit = orders.reduce((sum, o) => sum + (o.nProfit || 0), 0);

    res.json({ success: true, data: { orders, nTotalProfit } });
  } catch (error) {
    next(error);
  }
};

const finishOrder = async (req, res, next) => {
  try {
    const { id, orderId } = req.params;
    await verifyRestaurantOwner(id, req.user.id);

    const order = await Order.findOneAndUpdate(
      { _id: orderId, iRestaurantId: id, eStatus: ORDER_STATUS.DUE },
      { eStatus: ORDER_STATUS.FINISHED },
      { new: true }
    );

    if (!order) throw new AppError("Order not found or already finished", 404);

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sName } = req.body;
    const manage = await verifyRestaurantOwner(id, req.user.id);
    if (!manage.bAddProduct) throw new AppError("Add product permission denied", 403);

    const category = await Category.create({ sName, iRestaurantId: id });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const bufferToBase64 = (buffer) => buffer.toString("base64");

const addItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sName, iCategoryId, sDescription, nStock, nOriginalPrice, nSalePrice, bAvailable } =
      req.body;

    const manage = await verifyRestaurantOwner(id, req.user.id);
    if (!manage.bAddProduct) throw new AppError("Add product permission denied", 403);

    let sImageUrl = "";
    let sDeleteImageUrl = "";

    if (req.file) {
      const base64 = bufferToBase64(req.file.buffer);
      const uploaded = await uploadToImgbb(base64);
      sImageUrl = uploaded.url;
      sDeleteImageUrl = uploaded.deleteUrl;
    }

    const item = await Item.create({
      iRestaurantId: id,
      iCategoryId,
      sName,
      sDescription: sDescription || "",
      nStock: Number(nStock),
      nOriginalPrice: Number(nOriginalPrice),
      nSalePrice: Number(nSalePrice),
      bAvailable: bAvailable !== undefined ? bAvailable === "true" || bAvailable === true : true,
      sImageUrl,
      sDeleteImageUrl,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;
    const manage = await verifyRestaurantOwner(id, req.user.id);
    if (!manage.bUpdateProduct) throw new AppError("Update product permission denied", 403);

    const item = await Item.findOne({ _id: itemId, iRestaurantId: id });
    if (!item) throw new AppError("Item not found", 404);

    const fields = ["sName", "iCategoryId", "sDescription", "nStock", "nOriginalPrice", "nSalePrice"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = ["nStock", "nOriginalPrice", "nSalePrice"].includes(field)
          ? Number(req.body[field])
          : req.body[field];
      }
    });

    if (req.body.bAvailable !== undefined) {
      item.bAvailable = req.body.bAvailable === "true" || req.body.bAvailable === true;
    }

    if (req.file) {
      await deleteFromImgbb(item.sDeleteImageUrl);
      const base64 = bufferToBase64(req.file.buffer);
      const uploaded = await uploadToImgbb(base64);
      item.sImageUrl = uploaded.url;
      item.sDeleteImageUrl = uploaded.deleteUrl;
    }

    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;
    const manage = await verifyRestaurantOwner(id, req.user.id);
    if (!manage.bRemoveProduct) throw new AppError("Remove product permission denied", 403);

    const item = await Item.findOne({ _id: itemId, iRestaurantId: id });
    if (!item) throw new AppError("Item not found", 404);

    await deleteFromImgbb(item.sDeleteImageUrl);
    await item.deleteOne();

    res.json({ success: true, message: "Item deleted" });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nDiscountPercentage } = req.body;
    await verifyRestaurantOwner(id, req.user.id);

    if (nDiscountPercentage === undefined || nDiscountPercentage < 0 || nDiscountPercentage > 100) {
      throw new AppError("Discount percentage must be between 0 and 100", 400);
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { nDiscountPercentage: Number(nDiscountPercentage) },
      { new: true }
    ).select("nDiscountPercentage sName");

    log.success(`Discount updated to ${restaurant.nDiscountPercentage}% for ${restaurant.sName}`, "SETTINGS");

    res.json({ success: true, data: { nDiscountPercentage: restaurant.nDiscountPercentage } });
  } catch (error) {
    next(error);
  }
};

const getMenuItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      categoryId,
      search,
      sort = "name",
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
    } = req.query;

    const isRestaurant = req.user.sRole === "restaurant";
    const manage = await Manage.findOne({ iRestaurantId: id });
    if (!manage) throw new AppError("Restaurant not found", 404);

    if (isRestaurant) {
      await verifyRestaurantAccess(id, req.user.id);
      ensureRestaurantService(manage);
    }

    const match = { iRestaurantId: new mongoose.Types.ObjectId(id) };
    if (categoryId) match.iCategoryId = new mongoose.Types.ObjectId(categoryId);
    if (!isRestaurant) match.bAvailable = true;
    if (search?.trim()) match.sName = { $regex: search.trim(), $options: "i" };
    if (minPrice || maxPrice) {
      match.nSalePrice = {};
      if (minPrice) match.nSalePrice.$gte = Number(minPrice);
      if (maxPrice) match.nSalePrice.$lte = Number(maxPrice);
    }

    const sortMap = {
      name: { sName: 1 },
      price_asc: { nSalePrice: 1 },
      price_desc: { nSalePrice: -1 },
      stock: { nStock: -1 },
    };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const projection = {
      sName: 1,
      sImageUrl: 1,
      sDescription: 1,
      nStock: 1,
      bAvailable: 1,
      nSalePrice: 1,
      iCategoryId: 1,
      iRestaurantId: 1,
    };
    if (isRestaurant && req.user.id === id) projection.nOriginalPrice = 1;

    const [items, total] = await Promise.all([
      Item.find(match)
        .sort(sortMap[sort] || sortMap.name)
        .skip(skip)
        .limit(limitNum)
        .select(projection),
      Item.countDocuments(match),
    ]);

    res.json({
      success: true,
      data: {
        items,
        total,
        page: pageNum,
        hasMore: skip + items.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
