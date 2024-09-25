//Endpoints for businesses
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from businesses!");
});

module.exports = router;
