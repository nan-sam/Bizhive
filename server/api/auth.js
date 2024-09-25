const express = require("express");
//Router is the object that manages these routes.
//We register a route with the router, then we register the router wherever we use it.
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from auth");
});

router.get("/me", (req, res) => {
  res.send("Here is your accounts info");
});

router.post("/register", (req, res) => {
  // console.log("REQUEST BODY:", req.body);
  res.send("Registration successful");
});

router.post("/login", (req, res) => {
  console.log("REQUEST BODY", req.body);
  res.send("Login successful");
});

module.exports = router;
