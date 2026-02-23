// this is the module in which user model schema is defined
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

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

// hash the password before dave in db
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12)
    next();
})

userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)
