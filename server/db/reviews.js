const client = require("./client");
const uuid = require("uuid");
//Functionality to create and delete reviews
//Give reviews their own id to enable deletion?

const fetchReviews = async () => {
  try {
    const SQL = `SELECT
    business.businessname,
    business.type,
    business.businessimage,
    reviews.id,
    reviews.usersid,
    reviews.businessid,
    reviews.review,
    reviews.rating,
    users.username
    FROM reviews
    INNER JOIN business ON reviews.businessid = business.id
    INNER JOIN users ON reviews.usersid = users.id`;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const createReview = async ({ usersid, businessid, review, rating }) => {
  if (!review || !rating) {
    const error = Error("review and rating are required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
  INSERT INTO reviews(id, usersid, businessid, review, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *
`;
  const response = await client.query(SQL, [
    uuid.v4(),
    usersid,
    businessid,
    review,
    rating,
  ]);
  return response.rows[0];
};

const deleteReview = async (id) => {
  const SQL = `DELETE from reviews WHERE id=$1 RETURNING * `;
  const {
    rows: [review],
  } = client.query(SQL, [id]);
  return review;
};

// const updateReview = async () => {} -- patch request;

module.exports = { createReview, fetchReviews, deleteReview };
