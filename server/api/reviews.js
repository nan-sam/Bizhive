//Endpoint for reviews
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from reviews");
});

module.exports = router;
