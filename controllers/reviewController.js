const Review = require("../models/reviewModel");

module.exports = function (app) {
  app.post("/api/reviews", (req, res, next) => {
    const review = new Review({
      reviewerID: req.body.reviewerID,
      reviewerName: req.body.reviewerName,
      reviewTime: req.body.reviewTime,
      reviewSummary: req.body.reviewSummary,
      fullReview: req.body.fullReview,
      reviewVote: req.body.reviewVote,
      productID: req.body.productID,
    });
    review
      .save()
      .then((createdReview) => {
        res.status(201).json({
          message: "Reviews added successfully",
          reviewID: createdReview._id,
        });
      })
      .catch(next);
  });

  app.get("/api/reviews", (req, res, next) => {
    Review.find({})
      .then((documents) => {
        console.log(documents);
        res.status(200).json({
          message: "Reviews fetched successfully",
          reviews: documents,
        });
      })
      .catch(next);
  });

  app.get("/api/reviews/:id", (req, res, next) => {
    Review.find({ productID: req.params.id })
      .then((documents) => {
        console.log(documents);
        res.status(200).json({
          message: "Reviews fetched successfully",
          reviews: documents,
        });
      })
      .catch(next);
  });

  app.put("/api/reviews/:id", (req, res, next) => {
    const review = new Review({
      _id: req.body._id,
      reviewerID: req.body.reviewerID,
      reviewerName: req.body.reviewerName,
      reviewTime: req.body.reviewTime,
      reviewSummary: req.body.reviewSummary,
      fullReview: req.body.fullReview,
      reviewVote: req.body.reviewVote,
      productID: req.body.productID,
    });
    Review.updateOne({ _id: req.params.id }, review)
      .then((result) => {
        res.status(200).json({ message: "Review has been updated" });
      })
      .catch(next);
  });

  app.delete("/api/reviews/:id", (req, res, next) => {
    Review.deleteOne({ _id: req.params.id })
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: "Review has been deleted" });
      })
      .catch(next);
  });
};
