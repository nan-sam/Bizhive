import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateReview = ({ auth, businesses, setReviews }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  // const [businessToShow, setBusinessToShow] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        await axios(`${BASE_URL}/business/${id}`).then((response) => {
          setBusiness(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusiness();
  }, [id]);

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };
  //Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      usersid: auth.id,
      businessid: business.id,
      review,
      rating,
    };
    console.log("authid", auth.id);
    console.log(newReview);
    try {
      const response = await axios.post(`${BASE_URL}/reviews`, newReview);
      console.log("new review", response);
      if (response) {
        const newReviews = await axios(`${BASE_URL}/reviews`);
        setReviews(newReviews);
        if (response.status === 200) {
          alert("Review successfully submitted");
          navigate(`/businesses`);
        }
        //f successful naviage back to businesses
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Post new review to the backend

  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave a Review for: {business?.businessname}</h2>
      {/* <img src={business?.businessimage} /> */}
      <label className="review-form">Review</label>
      <textarea placeholder="What did you think?" onChange={handleChange} />
      <label className="review-form">
        Rating
        <input type="radio" name="rating" value="1" onChange={handleRating} />
        <input type="radio" name="rating" value="2" onChange={handleRating} />
        <input type="radio" name="rating" value="3" onChange={handleRating} />
        <input type="radio" name="rating" value="4" onChange={handleRating} />
        <input type="radio" name="rating" value="5" onChange={handleRating} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
export default CreateReview;
