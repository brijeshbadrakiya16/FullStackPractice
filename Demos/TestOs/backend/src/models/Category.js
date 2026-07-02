const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    sName: { type: String, required: true },
    iRestaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
