import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserCard from "../components/Users/UserCard";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SingleUser({ reviews }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);

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
  }, [id]);

  const userReviews = reviews?.filter((review) => review?.usersid === user?.id);

  return (
    <div className="single-card">
      <h3>{user?.username}</h3>
      {userReviews.map((review) => (
        <div key={review.id} className="user-reviews">
          <h4>{review?.businessname}</h4>
          <p>'{review?.review}'</p>
          <p>Rating:{review?.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default SingleUser;
