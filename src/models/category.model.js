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
    default:null// null for system
    }
}

)

module.exports = mongoose.model("Category", categorySchema);