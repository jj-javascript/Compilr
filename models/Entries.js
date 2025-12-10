const mongoose = require("mongoose");
const { image } = require("../middleware/cloudinary");


//  Worked with Ryan HF on setting this up

const EntrySchema = new mongoose.Schema({
  createdByID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  url : {
    type: String,
    match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favorited: {
    type: Boolean,
    default: false,
  },
  favicon: String
});

module.exports = mongoose.model("Entry", EntrySchema);


