// this is the module to define the schema for organization
const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },

    type: {
        type: String,
        enum: ["business", "school", "hospital", "ngo"]
    },

    industry: String,

    logo: String,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    defaultCurrency: { type: String, default: "PKR" },

    isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model("Organization", organizationSchema)