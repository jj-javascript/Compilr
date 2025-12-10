const mongoose = require("mongoose");

const FeedSchema = new mongoose.Schema ({
    createdByID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entry"
    }]
  })
  

module.exports = mongoose.model("Feed", FeedSchema);