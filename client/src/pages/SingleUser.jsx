import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SingleUser({ auth, reviews }) {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState(reviews);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios(`${BASE_URL}/users/${id}`).then((response) => {
          setUser(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [id, BASE_URL]);

  useEffect(() => {
    if (user) {
      setUserReviews(reviews?.filter((review) => review?.usersid === user?.id));
    }
  }, [user, reviews]);

  const deleteReview = async (id, reviewid) => {
    if (auth.id === id) {
      try {
        // Send DELETE request to the backend to delete the review
        const response = await axios.delete(
          `${BASE_URL}/users/${id}/${reviewid}`
        );

        if (response.status === 200) {
          // Filter out the deleted review from the local state
          setUserReviews((prevReviews) =>
            prevReviews.filter((review) => review.id !== reviewid)
          );
          alert("Review deleted successfully");
        }
      } catch (error) {
        console.log("Error deleting review:", error);
        alert("Failed to delete review");
      }
    } else {
      alert("You can only delete your own reviews");
    }
  };

  return (
    <div className="single-card">
      <h3>{user?.username}</h3>
      {userReviews.map((review) => (
        <div key={review.id} className="user-reviews">
          {auth?.id === review?.usersid && (
            <button
              onClick={() => deleteReview(review?.usersid, review.id)}
            ></button>
          )}
          <h4>{review?.businessname}</h4>
          <p>'{review?.review}'</p>
          <p>Rating:{review?.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default SingleUser;
