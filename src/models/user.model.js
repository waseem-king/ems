// this is the module in which user model schema is defined
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: String,

    avatar: String,

    defaultCurrency: { type: String, default: "PKR" },

    occupation: String, // optional (student, housewife etc.)

    isEmailVerified: { type: Boolean, default: false },

    isActive: { type: Boolean, default: true },

    lastLogin: Date

})

module.exports = mongoose.model("User", userSchema)