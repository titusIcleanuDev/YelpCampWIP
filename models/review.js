const mongoose = require("mongoose");

const mongooseReviewSchema = new mongoose.Schema({
  body: {
    type: String,
  },
  rating: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", mongooseReviewSchema);
