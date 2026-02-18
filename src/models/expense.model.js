const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema(
    {
  title: String,

  amount: { type: Number, required: true },

  category: {
    type: ObjectId,
    ref: "Category"
  },

  date: { type: Date, default: Date.now },

  ownerType: {
    type: String,
    enum: ["user", "organization"]
  },

  ownerId: ObjectId,

  createdBy: {
    type: ObjectId,
    ref: "User"
  },

  note: String
}
)

module.exports = mongoose.model("Expenses", expenseSchema)


