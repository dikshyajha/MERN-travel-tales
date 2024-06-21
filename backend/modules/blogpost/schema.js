const mongoose = require("mongoose");
const Schema = mongoose.Schema

const postSchema = new Schema({
    title:
    {
      type: "String",
        required: true 
    },
    description:  {
      type: "String",
      required: true,
    },

    image: {
      type: "String",
      required: "true"
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);