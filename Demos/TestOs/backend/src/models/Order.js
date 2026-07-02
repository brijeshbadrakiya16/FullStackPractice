const mongoose = require("mongoose");
const { ORDER_STATUS } = require("../config/constants");

const orderItemSchema = new mongoose.Schema(
  {
    iItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    count: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    iCustomerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    iRestaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    aItems: [orderItemSchema],
    nBillAmount: { type: Number, required: true },
    nDiscount: { type: Number, required: true },
    nFinalPrice: { type: Number, required: true },
    nChange: { type: Number, default: 0 },
    nPlatformFee: { type: Number, default: 0 },
    nRestaurantNet: { type: Number, required: true },
    eStatus: { type: String, enum: [ORDER_STATUS.DUE, ORDER_STATUS.FINISHED], default: ORDER_STATUS.DUE },
    dOrderDate: { type: Date, default: Date.now },
    nItemsCount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
