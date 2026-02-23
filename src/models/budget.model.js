const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    name: String,

    amount: Number,

    month: Number,
    year: Number,

    ownerType: {
        type: String,
        enum: ["user", "organization"]
    },

    ownerId: {
        type:mongoose.Schema.Types.ObjectId,
        refPath:"ownerType"
    }
})

module.exports = mongoose.model("Budgets", budgetSchema);