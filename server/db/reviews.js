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

const deleteReview = async ({ reviewid, userid }) => {
  try {
    console.log("Attempting to delete review with:");
    console.log("Review ID:", reviewid);
    console.log("Users ID:", userid);
    const SQL = `DELETE FROM reviews WHERE id=$1 AND usersid=$2 RETURNING *`;
    const {
      rows: [review],
    } = await client.query(SQL, [reviewid, userid]);
    if (!review) {
      throw Error("Review not found");
    }
    return review;
  } catch (error) {
    console.error("Error deleting review:", error.message);
    throw error; // Rethrow the error for handling at a higher level
  }
};
// const updateReview = async () => {} -- patch request;

module.exports = { createReview, fetchReviews, deleteReview };
