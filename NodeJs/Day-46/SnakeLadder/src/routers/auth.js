const expr = require("express");
const { register } = require("../controllers/auth");

const authRouter = expr.Router();

authRouter.post("/register",register);


module.exports = { authRouter };