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
  findUserWithToken,
  createReview,
} = require("../db/index");

const { requireUser } = require("../api/utils");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);

    next();
  } catch (ex) {
    next(ex);
  }
};

router.get("/", (req, res) => {
  res.send("Hello from auth");
});

router.get("/me", isLoggedIn, requireUser, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

router.post("/register", async (req, res, next) => {
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

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id, username: user.username }, JWT, {
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
  const result = await authenticate(req.body);
  try {
    if (result) {
      const decoded = jwt.verify(result.token, JWT);

      const token = jwt.sign(
        { id: decoded.id, username: decoded.username },
        JWT,
        {
          expiresIn: "7d",
        }
      );

      res.send({
        message: "Login successful",
        token,
        user: {
          id: decoded.id,
          username: decoded.username,
        },
      });
    } else {
      next({
        name: "Incorrect Credentials Error",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
