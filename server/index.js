//We import express to help us create routes (locations on our server we make requests to(endpoints))
//Just like we imported axios, react-router-dom etc with npm, we do the same with express and store
//it in a variable. The use this objec to help us create a server
//We then use our logic to take this request, do something to it, and respond to it
const express = require("express");

//This will let us process any environment variables in our app. It needs to be before
//any other routes because routes might need access to them, so they need to be running
//in advance
require("dotenv").config();

const {
  client,
  // createTables,
  createUser,
  fetchUsers,
  authenticate,
  findUserWithToken,
} = require("./db");

//We now run express as a function. This is avaialble when we run our first line of code and create
//an express app which allows us to take requests and make responses
//This will create an express application
const app = express();

//Use is a method provided by express and it has many different uses.
//In this case, use helps us tell our app what to do with request bodies that are in json. This is
//important, for example, when making post requests. We get a body back (req.body) but unless we tell express
//to json it, "undefined" is returned when we console.log
//This is in our root because we want any request that comes in here to first be turned into a javascript object we can work with
//It takes any json we send in the body of our request and parses it into an object.
//The order is imoprtant. It is near the top because it converts the body of requests into objects before passing
//them to the endpoints/routers like
// /api, /auth, etc
app.use(express.json());

//for deployment only
const path = require("path");
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/dist/assets"))
);

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

//Registered routes

//We're telling express that if this file(index.js) gets any requests with /api in it
//Send them here
app.use("/api", require("./api"));

app.post("/api/auth/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.send(await authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/auth/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

const init = async () => {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  // await createTables();
  // console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  console.log(await fetchUsers());

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
