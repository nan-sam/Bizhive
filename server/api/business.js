//Endpoints for businesses
const express = require("express");
const { fetchBusinesses } = require("../db/business");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await fetchBusinesses();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

//fetch all businesses
//fetch business type
module.exports = router;
