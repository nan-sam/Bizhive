const client = require("./client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const createUser = async ({
  firstname,
  lastname,
  email,
  username,
  password,
}) => {
  if (!username || !password) {
    const error = Error("username and password required!");
    error.status = 401;
    throw error;
  }
  //We used the $ because we let the library clean the data before inserstion

  const SQL = `
    INSERT INTO users(id, firstname, lastname, email, username, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    firstname || "firstname",
    lastname || "lastname",
    email || "email",
    username,
    await bcrypt.hash(password, 5),
  ]);

  return response;
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id, username, password FROM users WHERE username=$1;
  `;

  const response = await client.query(SQL, [username]);

  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: response.rows[0].id, username: response.rows[0].username },
    JWT
  );

  // const decoded = jwt.verify(token, JWT);
  // console.log("check secret:", decoded);

  return { token };
};

module.exports = { authenticate, createUser };
