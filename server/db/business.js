const client = require("./client");
const uuid = require("uuid");

const fetchBusinesses = async () => {
  const SQL = `SELECT * FROM business`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchBusinessById = async (id) => {
  try {
    const SQL = `SELECT * FROM business WHERE id=$1`;
    const {
      rows: [user],
    } = await client.query(SQL, [id]);
    return user;
  } catch (err) {
    console.log(err);
  }
};
const fetchBusinessByType = async (type) => {
  if (!type) {
    const error = Error("Business type required!");
    error.status = 401;
    throw error;
  }
  const SQL = `SELECT * FROM business WHERE type=$1`;
  const response = await client.query(SQL, [type]);
  return response.rows;
};
const createBusiness = async ({ businessname, type, businessimage }) => {
  if (!businessname || !type) {
    const error = Error("businessname and type required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO business(id, businessname, type, businessimage) VALUES($1, $2, $3, $4) RETURNING *
     `;
  const response = await client.query(SQL, [
    uuid.v4(),
    businessname,
    type,
    businessimage ||
      "https://images.pexels.com/photos/8872548/pexels-photo-8872548.jpeg",
  ]);
  return response;
};

module.exports = {
  fetchBusinesses,
  fetchBusinessByType,
  fetchBusinessById,
  createBusiness,
};
