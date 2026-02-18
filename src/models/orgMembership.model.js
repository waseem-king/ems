const mongoose = require("mongoose");

const orgMemberSchema = new mongoose.Schema({
        user: { type: ObjectId, ref: "User" },
        role: {
            type: String,
            enum: ["admin", "member", "accountant"]
        },
         joinedAt: Date
})

module.exports = mongoose.model("OrganizationMembership", orgMemberSchema);