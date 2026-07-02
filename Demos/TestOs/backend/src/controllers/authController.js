const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const Restaurant = require("../models/Restaurant");
const Manage = require("../models/Manage");
const { generateToken, generateAdminToken } = require("../utils/tokenHelpers");
const { generateQrBase64 } = require("../utils/qrGenerator");
const { uploadToImgbb } = require("../utils/imgbbUploader");
const { AppError } = require("../middlewares/errorHandler");
const { DEFAULT_MANAGE_FLAGS } = require("../config/constants");
const {
  validateEmail,
  validatePassword,
  validateContactNumber,
  validateName,
  validateRequired,
} = require("../utils/validators");
const log = require("../utils/logger");

const throwValidationErrors = (errors) => {
  if (!errors.length) return;
  const err = new AppError(errors[0].message, 400);
  err.errors = errors;
  throw err;
};

const validateCustomerRegistration = (body) => {
  const errors = [];
  try {
    validateName(body.sName, "Full name");
  } catch (e) {
    errors.push({ field: "sName", message: e.message });
  }
  try {
    validateEmail(body.sEmail);
  } catch (e) {
    errors.push({ field: "sEmail", message: e.message });
  }
  try {
    validatePassword(body.sPassword);
  } catch (e) {
    errors.push({ field: "sPassword", message: e.message });
  }
  try {
    validateContactNumber(body.sContactNumber);
  } catch (e) {
    errors.push({ field: "sContactNumber", message: e.message });
  }
  throwValidationErrors(errors);
};

const validateRestaurantRegistration = (body) => {
  const errors = [];
  try {
    validateName(body.sName, "Restaurant name");
  } catch (e) {
    errors.push({ field: "sName", message: e.message });
  }
  try {
    validateRequired(body.sAddress, "Address");
  } catch (e) {
    errors.push({ field: "sAddress", message: e.message });
  }
  try {
    validateEmail(body.sEmail);
  } catch (e) {
    errors.push({ field: "sEmail", message: e.message });
  }
  try {
    validatePassword(body.sPassword);
  } catch (e) {
    errors.push({ field: "sPassword", message: e.message });
  }
  try {
    validateContactNumber(body.sContactNumber);
  } catch (e) {
    errors.push({ field: "sContactNumber", message: e.message });
  }
  throwValidationErrors(errors);
};

const registerCustomer = async (req, res, next) => {
  try {
    const { sName, sEmail, sPassword, sContactNumber } = req.body;
    validateCustomerRegistration(req.body);

    const email = validateEmail(sEmail);
    const contact = validateContactNumber(sContactNumber);

    const existing = await Customer.findOne({ $or: [{ sEmail: email }, { sContactNumber: contact }] });
    if (existing) {
      if (existing.sEmail === email) {
        throw new AppError("An account with this email already exists", 409);
      }
      throw new AppError("This contact number is already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(sPassword, 10);
    const customer = await Customer.create({
      sName: validateName(sName, "Full name"),
      sEmail: email,
      sPassword: hashedPassword,
      sContactNumber: contact,
    });

    const token = generateToken({ id: customer._id, sRole: customer.sRole, sEmail: customer.sEmail });

    log.funny("🎉", `New customer registered — ${customer.sName} just joined the feast!`);

    res.status(201).json({
      success: true,
      token,
      user: { id: customer._id, sName: customer.sName, sEmail: customer.sEmail, sRole: customer.sRole },
    });
  } catch (error) {
    next(error);
  }
};

const loginCustomer = async (req, res, next) => {
  try {
    const { sEmail, sPassword } = req.body;
    if (!sEmail || !sPassword) {
      throw new AppError("Email and password are required", 400);
    }

    const email = String(sEmail).trim().toLowerCase();
    const customer = await Customer.findOne({ sEmail: email });
    if (!customer || !(await bcrypt.compare(sPassword, customer.sPassword))) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!customer.bActive) {
      throw new AppError("Your account has been deactivated. Contact support.", 403);
    }

    const token = generateToken({ id: customer._id, sRole: customer.sRole, sEmail: customer.sEmail });

    res.json({
      success: true,
      token,
      user: { id: customer._id, sName: customer.sName, sEmail: customer.sEmail, sRole: customer.sRole },
    });
  } catch (error) {
    next(error);
  }
};

const registerRestaurant = async (req, res, next) => {
  try {
    const { sName, sAddress, sContactNumber, sEmail, sPassword } = req.body;
    validateRestaurantRegistration(req.body);

    const email = validateEmail(sEmail);
    const contact = validateContactNumber(sContactNumber);

    const existing = await Restaurant.findOne({ $or: [{ sEmail: email }, { sName: validateName(sName, "Restaurant name") }] });
    if (existing) {
      if (existing.sEmail === email) {
        throw new AppError("A restaurant with this email already exists", 409);
      }
      throw new AppError("A restaurant with this name already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(sPassword, 10);

    const restaurant = await Restaurant.create({
      sName: validateName(sName, "Restaurant name"),
      sAddress: validateRequired(sAddress, "Address"),
      sContactNumber: contact,
      sEmail: email,
      sPassword: hashedPassword,
    });

    const restaurantUrl = `${process.env.CLIENT_URL}/restaurant/${restaurant._id}`;
    const qrBase64 = await generateQrBase64(restaurantUrl);
    const { url, deleteUrl } = await uploadToImgbb(qrBase64);

    restaurant.sQrUrl = url;
    restaurant.sQrDeleteUrl = deleteUrl;
    await restaurant.save();

    await Manage.create({
      iRestaurantId: restaurant._id,
      sName: restaurant.sName,
      ...DEFAULT_MANAGE_FLAGS,
    });

    const token = generateToken({ id: restaurant._id, sRole: restaurant.sRole, sEmail: restaurant.sEmail });

    log.funny("🍕", `New restaurant joined the family! Welcome aboard, ${restaurant.sName}!`);

    res.status(201).json({
      success: true,
      token,
      user: { id: restaurant._id, sName: restaurant.sName, sEmail: restaurant.sEmail, sRole: restaurant.sRole },
    });
  } catch (error) {
    next(error);
  }
};

const loginRestaurant = async (req, res, next) => {
  try {
    const { sEmail, sPassword } = req.body;
    if (!sEmail || !sPassword) {
      throw new AppError("Email and password are required", 400);
    }

    const email = String(sEmail).trim().toLowerCase();
    const restaurant = await Restaurant.findOne({ sEmail: email });
    if (!restaurant || !(await bcrypt.compare(sPassword, restaurant.sPassword))) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken({ id: restaurant._id, sRole: restaurant.sRole, sEmail: restaurant.sEmail });

    res.json({
      success: true,
      token,
      user: { id: restaurant._id, sName: restaurant.sName, sEmail: restaurant.sEmail, sRole: restaurant.sRole },
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { sEmail, sPassword } = req.body;

    if (!sEmail || !sPassword) {
      throw new AppError("Email and password are required", 400);
    }

    const envEmail = process.env.SUPER_ADMIN_EMAIL;
    const envPassword = process.env.SUPER_ADMIN_PASSWORD;

    let passwordMatch = sPassword === envPassword;
    if (!passwordMatch && envPassword.startsWith("$2")) {
      passwordMatch = await bcrypt.compare(sPassword, envPassword);
    }

    if (sEmail !== envEmail || !passwordMatch) {
      throw new AppError("Invalid admin credentials", 401);
    }

    const token = generateAdminToken({ role: "superadmin" });

    log.admin("SuperAdmin has entered the building. Hide the good snacks and roll out the red carpet!");

    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  registerRestaurant,
  loginRestaurant,
  loginAdmin,
};
