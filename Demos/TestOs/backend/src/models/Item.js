const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    iRestaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    iCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    sName: { type: String, required: true },
    sImageUrl: { type: String, default: "" },
    sDeleteImageUrl: { type: String, default: "" },
    sDescription: { type: String, default: "" },
    nStock: { type: Number, required: true },
    bAvailable: { type: Boolean, default: true },
    nOriginalPrice: { type: Number, required: true },
    nSalePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
