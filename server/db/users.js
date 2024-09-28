const client = require("./client");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const createUser = async ({ username, password }) => {
  if (!username || !password) {
    const error = Error("username and password required!");
    error.status = 401;
    throw error;
  }
  //We used the $ because we let the library clean the data before inserstion
  //ON CONFLICT (username) DO NOTHING
  const SQL = `
    INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
  ]);

  return response.rows[0];
};

module.exports = { createUser };
