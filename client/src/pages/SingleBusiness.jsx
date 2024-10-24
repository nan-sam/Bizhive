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
          console.log(response.data);
          setBusiness(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusiness();
  }, [id]);

  return (
    <div className="single-card">
      <p>{business.businessname}</p>
    </div>
  );
}

export default SingleBusiness;
