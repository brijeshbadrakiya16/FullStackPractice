const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://brijesh:Brijesh.@learning.sdjcmsv.mongodb.net/snackLadder");
}

module.exports = { connectDB };