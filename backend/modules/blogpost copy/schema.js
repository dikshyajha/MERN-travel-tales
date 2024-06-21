const mongoose = require("mongoose");
const Schema = mongoose.Schema

const savedpostSchema = new Schema({
    userId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true 
    },
    postId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true 
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SavedPost", savedpostSchema);