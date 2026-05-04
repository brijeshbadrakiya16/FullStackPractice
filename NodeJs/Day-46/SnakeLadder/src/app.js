const { connectDb } = require('./database/mongo');
const { connectRedis } = require("./database/redis");

const { authRouter } = require('./routers/auth');




const cookieParser = require("cookie-parser");
const expr = require("express");



const app = expr();

app.use(expr.json());
app.use(cookieParser());

app.use("/auth", authRouter);
// app.use("/game",);

connectDb().then(() => {
    connectRedis().then(() => {
        app.listen(2000, "0.0.0.0", () => {
            console.log("Server is listening on http://192.168.20.117:2000");
        })
    })
})