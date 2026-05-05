require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        unique: true,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    age: {
        type: Number,
        min: 12,
    },
    gender: {
        type: String,
        lowercase: true,
        enum: {
            values: ["male", "female", "others"],
            message: '{VALUE} is not a valid gender type.'
        }
    },
    coins: {
        type: Number,
        default: 500,
    },
    profileImg: {
        type: String,
        default: "https://www.agathon.ch/hs-fs/hubfs/dummy-user.png?width=310&height=310&name=dummy-user.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid profile photo url : " + value);
            }
        }
    }
}, { timestamps: true });

playerSchema.methods.getJWT = async function () {
    const player = this;

    const token = await jwt.sign(
        { _id: player._id, playerName: player.playerName },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2d" }
    );

    return token;
}

playerSchema.methods.validatePassword = async function (input) {
    const player = this;

    const result = await bcrypt.compare(
        input,
        player.password
    );

    return result;
}



const Player = mongoose.model("Player", playerSchema);

module.exports = { Player };