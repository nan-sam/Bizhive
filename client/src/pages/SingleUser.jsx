import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios(`${BASE_URL}/users/${id}`).then((response) => {
          console.log(response.data);
          setUser(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return <div>SingleUser</div>;
}

export default SingleUser;
