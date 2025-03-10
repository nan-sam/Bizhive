import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SingleBusiness({ auth, reviews }) {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

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

  const businessReviews = reviews?.filter(
    (review) => review?.businessid === business?.id
  );

  const averageReviews =
    businessReviews.reduce((sum, review) => sum + review.rating, 0) /
    businessReviews.length;

  const averageScore = averageReviews.toFixed(1);

  return (
    <div className="single-card">
      <h2>{business?.businessname}</h2>
      <h3>
        Average Rating:{" "}
        {averageScore === "NaN" ? <p>No ratings yet</p> : averageScore}
      </h3>
      <img src={business?.businessimage} alt={business?.businessname} />
      {businessReviews.map((review) => (
        <div key={review?.id} className="single-reviews">
          <p>From {review?.username}</p>
          <p>'{review?.review}'</p>
          <p>Rating: {review?.rating}</p>
        </div>
      ))}
      {/* Double check functionality */}
      {!auth && (
        <>
          <Link className="single-button" to="/login">
            Login
          </Link>
          <p className="single-p"></p>
        </>
      )}
      {auth && (
        <>
          <Link className="single-button" to={`/createreview/${id}`}>
            Create Review
          </Link>
        </>
      )}
    </div>
  );
}

export default SingleBusiness;
