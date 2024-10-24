import React from "react";

function ReviewForm() {
  return (
    <form>
      <h2>Leave a Review</h2>
      <label>Restaurant</label>
      <input type="text" placeholder="Restaurant name" />
      <label>Review</label>
      <textarea placeholder="What did you think?" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
