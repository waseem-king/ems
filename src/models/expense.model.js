const mongoose = require("mongoose")

// this is the schema in case of shared expense

const pariticipantSchema = new mongoose.Schema({
  name:{ type:String, required:true},
  idCard:String,
  mobile:String,
  isUser:{ type:Boolean, default:false},
  userId:{ type:mongoose.Schema.Types.ObjectId, ref:"User"},
  paidAmount:{ type:Number, default:0},
  amountOwed:{ type:Number, required:true},
  paidAt:Date,
})

// this is the schema for expense

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

  note: String,
  // here is properties for sharing expenses
  splitType:{ type:String, enum:["equal", "percentage", "custom"], default:"equal"},
  participants:[pariticipantSchema]
},
{ timestamps:true}
)



module.exports = mongoose.model("Expense", expenseSchema)


