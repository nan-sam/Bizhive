const express = require("express");
//Router is the object that manages these routes.
//We register a route with the router, then we register the router wherever we use it.
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
const {
  createUser,
  authenticate,
  fetchUserByUsername,
} = require("../db/index");
const { requireUser } = require("../api/utils");

router.get("/", (req, res) => {
  res.send("Hello from auth");
});

router.get("/me", (req, res) => {
  res.send("Here is your accounts info");
});

router.post("/register", async (req, res, next) => {
  // console.log("REQUEST BODY:", req.body);
  const { firstname, lastname, email, username, password } = req.body;
  if (!username) {
    next({ name: "UsernameRequiredError", message: "Username not provided" });
    return;
  }
  if (!password) {
    next({ name: "PasswordRequiredError", message: "Password not provided" });
    return;
  }
  try {
    const existingUser = await fetchUserByUsername(username);
    if (existingUser) {
      next({ name: "UserAlreadyExistsError", message: "User already exists" });
      return;
    }
    const result = await createUser(req.body);
    if (result) {
      const token = jwt.sign({ id: result.id, username }, JWT, {
        expiresIn: "1wk",
      });
      console.log(token);
      res.send({
        message: "Registration successful",
        token,
        user: {
          id: result.id,
          firstname: result.firstname,
          lastname: result.lastname,
          email: result.email,
          username: result.username,
          password: result.password,
        },
      });
      return;
    } else {
      next({
        name: "RegistrationError",
        message: "Error registering, try again later",
      });
      return;
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", (req, res, next) => {
  console.log("REQUEST BODY", req.body);
  res.send("Login successful");
});

module.exports = router;
