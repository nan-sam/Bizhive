//Endpoint for reviews
const express = require("express");
const router = express.Router();
const { createReview } = require("../db/reviews");

router.get("/", (req, res) => {
  res.send("Hello from reviews");
});

router.get("/createreview", (req, res) => {
  res.send("Hello from create reviews");
});

router.post("/createreview", async (req, res, next) => {
  const { review, rating } = req.body;
  if (!review || !rating) {
    next({
      name: "MissingReviewInformation",
      message: "Please supply both a review and a rating",
    });
    return;
  }
  const result = await createReview(req.body);
  try {
    if (result) {
      res.send({
        message: "Review successfully created",
      });
      return;
    } else {
      next({
        name: "IncorrectInformationError",
        message: "Trouble creating review. Try again later",
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
