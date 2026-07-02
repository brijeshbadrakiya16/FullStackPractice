const mongoose = require("mongoose");
const { ROLES, DEFAULT_DISCOUNT_PERCENTAGE } = require("../config/constants");

const restaurantSchema = new mongoose.Schema(
  {
    sName: { type: String, required: true, unique: true },
    sAddress: { type: String, required: true },
    sQrUrl: { type: String, default: "" },
    sQrDeleteUrl: { type: String, default: "" },
    sContactNumber: { type: String, required: true },
    sEmail: { type: String, required: true, unique: true },
    sPassword: { type: String, required: true },
    nDiscountPercentage: { type: Number, default: DEFAULT_DISCOUNT_PERCENTAGE },
    sRole: { type: String, default: ROLES.RESTAURANT },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
