const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const reviewsController = require("../controllers/reviewsController");
const { validatedReview, isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, validatedReview, catchAsync(reviewsController.createReview));
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteReview));

module.exports = router;
