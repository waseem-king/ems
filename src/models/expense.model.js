const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema(
    {
  title: String,

  amount: { type: Number, required: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  date: { type: Date, default: Date.now },

  ownerType: {
    type: String,
    enum: ["user", "organization"]
  },

  ownerId: {
    type:mongoose.Schema.Types.ObjectId,
    refPath:'ownerType',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  note: String
}
)

module.exports = mongoose.model("Expenses", expenseSchema)


