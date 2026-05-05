const bcrypt = require("bcrypt");
const { Player } = require("../models/player");


const register = async (req, res, next) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 12);

        const allowedFields = ['playerName', 'password', 'age', 'gender', 'profileImg'];

        const checkFields = Object.keys(req.body).every(x => allowedFields.includes(x));

        if (!checkFields) {
            throw new Error("Invalid Data.");
        }

        const player = new Player({
            playerName: req.body.playerName,
            password: passwordHash,
            age: req.body.age ?? 12,
            // coins: 500,
        })

        const data = await player.save();
        res.status(201).json({ message: "Registered Successfully.", data: data });

    } catch (err) {
        res.status(400).json({ err: err });
    }
}

const login = async (req, res, next) => {
    try {
        const { playerName, password } = req.body;
        if (!playerName || !password) {
            throw new Error("Invalid Data.");
        }

        const player = await Player.findOne({ playerName: playerName });

        if (!player) {
            throw new Error("Please register first.");
        }

        const isPasswordValid = await player.validatePassword(password);

        if (isPasswordValid) {
            const token = await player.getJWT();

            res.cookie("token", token);

            res.status(200).json({ message: "Login successfull", data: { playerName: player.playerName, age: player.age, coins: player.coins } });
        } else {
            throw new Error("Invalid Data");
        }
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}


module.exports = { register, login };