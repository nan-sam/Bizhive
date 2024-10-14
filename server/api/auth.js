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
  createReview,
} = require("../db/index");

const { requireUser } = require("../api/utils");

router.get("/", (req, res) => {
  res.send("Hello from auth");
});

router.get("/me", requireUser, async (req, res) => {
  try {
    if (req.user) {
      // const userReviews = await createReview(req.user.id);
      res.send(req.user);
    } else {
      res.send("Error, make sure you're logged in");
    }
  } catch (err) {
    res.send({ err, message: "Something went wrong" });
  }
});

router.post("/register", async (req, res, next) => {
  // console.log("REQUEST BODY:", req.body);
  const { firstname, lastname, email, username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
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
        expiresIn: "7d",
      });
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

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
    return;
  }
  try {
    const result = await authenticate(req.body);
    if (result) {
      const token = jwt.sign({ id: result.id, username }, JWT, {
        expiresIn: "7d",
      });

      res.send({
        message: "Login successful",
        token,
        user: {
          id: result.id,
          username: result.username,
          password: result.password,
        },
      });
      return;
    } else {
      next({
        name: "Incorrect Credentials Error",
        message: "Username or password is incorrect",
      });
      return;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
