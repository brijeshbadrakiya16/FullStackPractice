const expr = require("express");
const { register, login } = require("../controllers/auth");

const authRouter = expr.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);

module.exports = { authRouter };