const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
  name: String,

  type: {
    type: String,
    enum: ["system", "custom"]
  },

  ownerId: ObjectId // null for system
}

)

module.exports = mongoose.model("Categorie", categorySchema);