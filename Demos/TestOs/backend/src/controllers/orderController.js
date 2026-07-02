const mongoose = require("mongoose");
const Order = require("../models/Order");
const Item = require("../models/Item");
const Restaurant = require("../models/Restaurant");
const Manage = require("../models/Manage");
const { AppError } = require("../middlewares/errorHandler");
const { ORDER_STATUS } = require("../config/constants");
const log = require("../utils/logger");

const placeOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { iRestaurantId, aItems } = req.body;

    if (!iRestaurantId || !aItems || !aItems.length) {
      throw new AppError("Restaurant ID and items are required", 400);
    }

    const manage = await Manage.findOne({ iRestaurantId }).session(session);
    if (!manage || !manage.bService) {
      throw new AppError("Restaurant is not available for orders", 403);
    }

    const restaurant = await Restaurant.findById(iRestaurantId).session(session);
    if (!restaurant) throw new AppError("Restaurant not found", 404);

    let nBillAmount = 0;
    let nItemsCount = 0;
    const validatedItems = [];

    for (const cartItem of aItems) {
      const item = await Item.findById(cartItem.iItemId).session(session);
      if (!item) throw new AppError(`Item not found: ${cartItem.iItemId}`, 404);
      if (!item.bAvailable) throw new AppError(`${item.sName} is not available`, 400);
      if (item.nStock < cartItem.count) {
        throw new AppError(`Insufficient stock for ${item.sName}`, 400);
      }

      nBillAmount += item.nSalePrice * cartItem.count;
      nItemsCount += cartItem.count;
      validatedItems.push({ iItemId: item._id, count: cartItem.count });

      item.nStock -= cartItem.count;
      await item.save({ session });
    }

    const nDiscount = nBillAmount * (restaurant.nDiscountPercentage / 100);
    const nFinalPrice = nBillAmount - nDiscount;
    const nPlatformFee = manage.nChange;
    const nRestaurantNet = nFinalPrice - nPlatformFee;

    const order = await Order.create(
      [
        {
          iCustomerId: req.user.id,
          iRestaurantId,
          aItems: validatedItems,
          nBillAmount,
          nDiscount,
          nFinalPrice,
          nChange: nPlatformFee,
          nPlatformFee,
          nRestaurantNet,
          nItemsCount,
          eStatus: ORDER_STATUS.DUE,
        },
      ],
      { session }
    );

    manage.nOrders += 1;
    manage.nProfit = (manage.nProfit || 0) + nPlatformFee;
    await manage.save({ session });

    await session.commitTransaction();

    log.order(`Order placed — customer pays $${nFinalPrice}, restaurant nets $${nRestaurantNet}`);

    res.status(201).json({ success: true, data: order[0] });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

module.exports = { placeOrder };
