const client = require("./client");
const uuid = require("uuid");

const fetchBusinesses = async () => {
  const SQL = `SELECT * FROM business`;
  const response = await client.query(SQL);
  return response.rows;
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

const createReview = async ({ review, rating }) => {
  if (!review || !rating) {
    const error = Error("review and rating are required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
  INSERT INTO reviews(usersId, businessId, review, rating) VALUES ($1, $2, $3, $4)
`;
  const response = await client.query(SQL, [
    usersId,
    businessId,
    review,
    rating,
  ]);
  return response;
};
module.exports = {
  fetchBusinesses,
  fetchBusinessByType,
  createBusiness,
  createReview,
};
