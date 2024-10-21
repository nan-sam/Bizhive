//Any routes than involve apis
//Endpoints for users
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

router.use((req, res, next) => {
  const auth = req.header("Authorization");

  const prefix = "Bearer ";
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      parsedToken = jwt.verify(token, JWT);
      console.log(parsedToken);
      next();
    } catch (err) {
      next(err);
    }
  }
});

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/business", require("./business"));
router.use("/reviews", require("./reviews"));

// //{baseUrl}/auth/me -> Any request to this uri (baseurl + endpoint) will get handled by the below
router.get("/", (req, res) => {
  res.send("Hello from /api");
});

module.exports = router;
