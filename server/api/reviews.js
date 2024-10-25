//Endpoint for reviews
const express = require("express");
const router = express.Router();
const { fetchReviews, createReview } = require("../db/reviews");

router.get("/", async (req, res) => {
  //Try catch
  const result = await fetchReviews();
  res.send(result);
});

router.get("/createreview", (req, res) => {
  res.send("Hello from create reviews");
});

router.post("/", async (req, res, next) => {
  try {
    const { userid, businessid, review, rating } = req.body;
    if (!review || !rating) {
      next({
        name: "MissingReviewInformation",
        message: "Please supply both a review and a rating",
      });
      return;
    }
    const result = await createReview(req.body);

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
