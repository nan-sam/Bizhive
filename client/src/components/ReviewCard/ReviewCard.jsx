import React from "react";

function ReviewCard({ reviews }) {
  return (
    <>
      <div className="review-card">
        <p>{reviews?.review}</p>
        <p>{reviews?.rating}</p>
      </div>
    </>
  );
}

export default ReviewCard;
