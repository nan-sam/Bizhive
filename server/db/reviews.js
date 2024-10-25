const client = require("./client");
const uuid = require("uuid");
//Functionality to create and delete reviews
//Give reviews their own id to enable deletion?

const fetchReviews = async () => {
  const SQL = `SELECT * FROM reviews`;
  const response = await client.query(SQL);
  return response.rows;

  // const fetchReviews = async () => {
  //   try {
  //     const SQL = `SELECT
  //   businesses.businessname,
  //   businesses.imageUrl,
  //   reviews.id,
  //   reviews.userid,
  //   reviews.businessid,
  //   reviews.comments,
  //   reviews.rating,
  //   users.username
  //   FROM reviews
  //   INNER JOIN businesses ON reviews.businessid = businesses.id
  //   INNER JOIN users ON reviews.userid = users.id`;
  //     const response = await client.query(SQL);
  //     return response.rows;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
