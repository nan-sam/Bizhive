//Endpoints for users
const express = require("express");
const router = express.Router();
const { fetchUsers } = require("../db/index");
const { findUserWithToken } = require("../db/users");

router.get("/", async (req, res) => {
  try {
    const results = await fetchUsers();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "something went wrong" });
  }
});

module.exports = router;
