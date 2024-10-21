const client = require("./client");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
// const bcrypt = require("bcrypt");

const fetchUsers = async () => {
  const SQL = `
    SELECT id, username FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchUserByUsername = async (username) => {
  try {
    const SQL = `SELECT * FROM users WHERE username=$1;`;
    const {
      rows: [user],
    } = await client.query(SQL, [username]);
    return user;
  } catch (err) {
    console.log(err);
  }
};

const findUserWithToken = async (token) => {
  console.log(token);
  const prefix = "Bearer ";

  if (token.startsWith(prefix)) {
    const parsedToken = token.slice(prefix.length);
    try {
      const payload = await jwt.verify(parsedToken, JWT);
      id = payload.id;
    } catch (ex) {
      const error = Error("not authorized");
      error.status = 401;
      throw error;
    }
    const SQL = `
    SELECT id, username FROM users WHERE id=$1;
  `;

    const response = await client.query(SQL, [id]);
    if (!response.rows.length) {
      const error = Error("not authorized");
      error.status = 401;
      throw error;
    }
    return response.rows[0];
  }
};

module.exports = { fetchUsers, findUserWithToken, fetchUserByUsername };
