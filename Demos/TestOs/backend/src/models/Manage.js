const mongoose = require("mongoose");
const { DEFAULT_N_CHANGE, DEFAULT_MANAGE_FLAGS } = require("../config/constants");

const manageSchema = new mongoose.Schema(
  {
    iRestaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true, unique: true },
    sName: { type: String, required: true },
    nChange: { type: Number, default: DEFAULT_N_CHANGE },
    bAddProduct: { type: Boolean, default: DEFAULT_MANAGE_FLAGS.bAddProduct },
    bUpdateProduct: { type: Boolean, default: DEFAULT_MANAGE_FLAGS.bUpdateProduct },
    bRemoveProduct: { type: Boolean, default: DEFAULT_MANAGE_FLAGS.bRemoveProduct },
    bService: { type: Boolean, default: DEFAULT_MANAGE_FLAGS.bService },
    nOrders: { type: Number, default: 0 },
    nProfit: { type: Number, default: 0 },
    bInProgress: { type: Boolean, default: DEFAULT_MANAGE_FLAGS.bInProgress },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manage", manageSchema);
