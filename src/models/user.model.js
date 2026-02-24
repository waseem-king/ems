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
    // in the case organization create their own organization member using this user schema
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    },
    // in the case organization create their own organization member using this user schema
    role: {
        type: String,
        enum: ['ceo', 'hr', 'team_lead', 'senior', 'junior'],
        default: "junior"
    },
    // in the case organization create their own organization member using this user schema
    employeeEmail: {
        type: String
    },
    // in the case organization create their own organization member using this user schema
    about: {
        type: String,
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
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12)
    next();
})

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)
