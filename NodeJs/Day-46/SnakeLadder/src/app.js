const { connectDB } = require('./database/mongo');
const { connectRedis } = require("./database/redis");
const { playerAuth } = require('./middlewares/auth');

const { authRouter } = require('./routers/auth');
// const { gameRouter } = require('./routers/game');


const { createServer } = require("node:http");

const cookieParser = require("cookie-parser");
const expr = require("express");

const app = expr();
const server = createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(server);



app.use(cookieParser());
app.use(expr.json());

app.use("/auth", authRouter);

// authentication middleware
// app.use(playerAuth);


connectDB().then(() => {
    connectRedis().then(() => {
        server.listen(2000, "0.0.0.0", () => {
            console.log("Server is listening on http://192.168.20.95:2000");
        })
    })
})

const { initiateGame } = require("./socket/game");

initiateGame(server);