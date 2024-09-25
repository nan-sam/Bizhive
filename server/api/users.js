//Endpoints for users
const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Here are your users");
// });

//POST request BASE_URL
router.post("/register", (req, res) => {
  res.send("user registered");
});
module.exports = router;
