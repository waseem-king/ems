const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
  name: String,

  type: {
    type: String,
    enum: ["system", "custom"]
  },

  ownerId: {
    type:mongoose.Schema.Types.ObjectId ,
    default:null
    }
}

)

module.exports = mongoose.model("Category", categorySchema);