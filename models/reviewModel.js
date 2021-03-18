const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    reviewerID: { type: String, required: true },
    reviewerName: { type: String, required: true },
    reviewTime: { type: String, required: true },
    reviewSummary: { type: String, required: true },
    fullReview: { type: String, required: true },
    reviewVote: { type: Number, required: true },
    productID: { type: String, required: true },
  },
  { collection: "Reviews" }
);

const Reviews = mongoose.model("Review", reviewSchema);

module.exports = Reviews;
