const client = require("./client");
//Functionality to create and delete reviews
//Give reviews their own id to enable deletion?

const fetchReviews = async () => {
  const SQL = `SELECT * FROM reviews`;
  const response = await client.query(SQL);
  return response.rows;
};

const createReview = async ({ review, rating }) => {
  if (!review || !rating) {
    const error = Error("review and rating are required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
  INSERT INTO reviews(id, usersId, businessId, review, rating) VALUES ($1, $2, $3, $4, $5)
`;
  const response = await client.query(SQL, [
    uuid.v4(),
    usersId,
    businessId,
    review,
    rating,
  ]);
  return response;
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
