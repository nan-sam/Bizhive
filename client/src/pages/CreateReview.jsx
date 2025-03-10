import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateReview = ({ auth, businesses, setReviews }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get business ID from URL (if exists)
  const [business, setBusiness] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]); // Store matching businesses
  const [selectedBusiness, setSelectedBusiness] = useState(null); // Selected business for review
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);

  useEffect(() => {
    // If ID exists in URL, fetch the business and don't show search bar
    if (id) {
      axios
        .get(`${BASE_URL}/business/${id}`)
        .then((response) => setBusiness(response.data))
        .catch((error) => console.error("Error fetching business:", error));
    }
  }, [id]);

  // Handle search input change
  const handleSearch = (e) => {
    if (!Array.isArray(businesses)) {
      console.error("Businesses is not an array", businesses);
      return;
    }

    const searchTerm = e.target.value.toLowerCase();
    const results = businesses.filter((b) =>
      b.businessname.toLowerCase().includes(searchTerm)
    );
    setFilteredBusinesses(results);
  };

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business);
    setFilteredBusinesses([]); // Hide dropdown
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const businessToReview = business || selectedBusiness;

    if (!businessToReview) {
      alert("Please select a business before submitting a review.");
      return;
    }
    const newReview = {
      usersid: auth.id,
      businessid: businessToReview.id, //
      review,
      rating,
    };

    try {
      const response = await axios.post(`${BASE_URL}/reviews`, newReview);
      if (response.status === 200) {
        const newReviews = await axios(`${BASE_URL}/reviews`);
        setReviews(newReviews);
        alert("Review successfully submitted");
        //If successful navigate back to businesses
        navigate(`/businesses`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Post new review to the backend

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        Leave a Review for:{" "}
        {business?.businessname ||
          selectedBusiness?.businessname ||
          "Select a Business"}
      </h2>

      {/* Show Search Bar Only If No Business Is Selected */}
      {!business && (
        <>
          <input
            type="text"
            placeholder="Search for a business..."
            onChange={handleSearch}
          />
          <ul>
            {filteredBusinesses.map((b) => (
              <ul key={b.id} onClick={() => handleSelectBusiness(b)}>
                {b.businessname}
              </ul>
            ))}
          </ul>
        </>
      )}

      <label className="review-form">Review</label>
      <textarea
        placeholder="What did you think?"
        onChange={(e) => setReview(e.target.value)}
      />

      <label className="review-form">
        Rating:
        {[1, 2, 3, 4, 5].map((num) => (
          <input
            key={num}
            type="radio"
            name="rating"
            value={num}
            onChange={(e) => setRating(e.target.value)}
          />
        ))}
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateReview;
