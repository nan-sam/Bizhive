const client = require("./client");
//Functionality to create and delete reviews
//Give reviews their own id to enable deletion?

const createReview = async ({ usersId, businessId, review, rating }) => {
  try {
    const SQL = `INSERT INTO reviews(
        usersId, businessId, review, rating
        )
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [usersId, businessId, review, rating]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteReview = async () => {};

module.exports = { createReview };
