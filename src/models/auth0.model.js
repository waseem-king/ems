const mongoose = require("mongoose");

const auth0Model = new mongoose.Schema({
    auth0Id:String,
    email:String,
    name:String,
    picture:String,
    role:String
})

module.exports = mongoose.model("auth0Model", auth0Model)