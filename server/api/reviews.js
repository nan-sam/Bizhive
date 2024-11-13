//Endpoint for reviews
const express = require("express");
const router = express.Router();
const { fetchReviews, createReview, deleteReview } = require("../db/reviews");

router.get("/", async (req, res) => {
  //Try catch
  const result = await fetchReviews();
  res.send(result);
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

router.delete("/", async (req, res, next) => {
  try {
    const { reviewid } = req.body;
    console.log("body", req.body);
    const result = await deleteReview(req.body);

    if (result) {
      res.send({ message: "Review successfully deleted" });
      return;
    } else {
      next({
        message: "Trouble deleting review. Try ahain later",
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
