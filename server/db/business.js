const client = require("./client");
const uuid = require("uuid");

const createBusiness = async ({ businessname, type }) => {
  if (!businessname || !type) {
    const error = Error("businessname and type required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO business(id, businessname, type) VALUES($1, $2, $3) RETURNING *
     `;
  const response = await client.query(SQL, [uuid.v4(), businessname, type]);
  return response;
};

module.exports = { createBusiness };
