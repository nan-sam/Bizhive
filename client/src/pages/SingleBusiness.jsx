import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SingleBusiness({ auth }) {
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

  //If logged in, implement a link to create a review
  return (
    <div className="single-card">
      <p>{business?.businessname}</p>
      {!auth && (
        <>
          <Link className="single-button" to="/login">
            Login
          </Link>
          <p className="single-p">to check out this book</p>
        </>
      )}
      {auth && (
        <>
          <Link className="single-button" to="/createreview">
            Create Review
          </Link>
        </>
      )}
    </div>
  );
}

export default SingleBusiness;
