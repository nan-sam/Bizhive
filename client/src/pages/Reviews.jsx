import { useState } from "react";
import ReviewCard from "../components/ReviewCard/ReviewCard";

function Reviews({ reviews }) {
  // console.log(reviews.review);
  return (
    <div className="review-container">
      {/* <h1>Reviews</h1> */}
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

export default Reviews;
