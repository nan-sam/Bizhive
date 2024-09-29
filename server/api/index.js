//Any routes than involve apis
//Endpoints for users
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/business", require("./business"));
router.use("/reviews", require("./reviews"));

// //{baseUrl}/auth/me -> Any request to this uri (baseurl + endpoint) will get handled by the below
router.get("/", (req, res) => {
  res.send("Hello from /api");
});

module.exports = router;
