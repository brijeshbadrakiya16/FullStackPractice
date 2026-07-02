const mongoose = require("mongoose");
const { ROLES } = require("../config/constants");

const customerSchema = new mongoose.Schema(
  {
    sName: { type: String, required: true },
    sEmail: { type: String, required: true, unique: true },
    sPassword: { type: String, required: true },
    sContactNumber: { type: String, required: true, unique: true },
    sRole: { type: String, default: ROLES.CUSTOMER },
    bActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
