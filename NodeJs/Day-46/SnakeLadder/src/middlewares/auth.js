require('dotenv');

const { Player } = require('../models/player');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie');

const playerAuth = async (cookie, socket) => {

    if (!cookie) {
        throw new Error("Please Login");
    }

    // console.log(cookieParser.parse(cookie));
    const { token } = cookieParser.parse(cookie);

    if (!token) {
        throw new Error("Please Login.");
    }

    const decodedData = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    );

    const player = await Player.findById(decodedData._id).select(["_id", "playerName", "age", "coins"]);

    if (!player) {
        throw new Error("Please Login Back.");
    }

    socket.data.player = player;
    console.log(player);
}

module.exports = { playerAuth };