//Endpoints for users
const express = require("express");
const router = express.Router();
const { fetchUsers } = require("../db/index");
const { findUserWithToken, fetchUserById } = require("../db/users");

router.get("/", async (req, res) => {
  try {
    const results = await fetchUsers();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "something went wrong" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await fetchUserById(req.params.id);
    if (!result) {
      next({ name: "Not Found", message: "No matching user found" });
      return;
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
