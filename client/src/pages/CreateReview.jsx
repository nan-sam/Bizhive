import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

{
  /* <Route path="/books/:id" element={<SingleBook token={token} />} */
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateReview = ({ auth, businesses, setReviews }) => {
  const { businessId } = useParams();
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(null);

  const [businessToReview, setBusinessToReview] = useState({});
  // const [submitted, setSubmitted] = useState();
  //A user should be able to search for a business, select that business, then leave a
  //review for that business
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        await axios(`${BASE_URL}/business/${businessId}`).then((response) => {
          console.log(response.data);
          setBusinessToReview(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusiness();
  }, [businessId]);

  const businessSearch = (e) => {
    const searchResults = businesses.find((business) =>
      business.businessname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBusinessToReview(searchResults);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Submit review

    // Post new review to the backend
  };

  return (
    <form>
      <h2>Leave a Review</h2>
      <label>Business Search</label>
      <input
        type="text"
        placeholder="Business name"
        onChange={businessSearch}
      />
      <label>Review</label>
      <textarea placeholder="What did you think?" />
      <button type="submit" onSubmit={handleSubmit}>
        Submit
      </button>
    </form>
  );
};
export default CreateReview;
