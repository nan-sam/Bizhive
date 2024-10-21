import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Account({ auth }) {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   axios(`${BASE_URL}/api/auth/me`, {
  //     headers: {
  //       Authorization: `Bearer ${auth}`,
  //     },
  //   }).then((data) => {
  //     console.log(data);
  //     // setUser()
  //   });
  // });

  return (
    <>
      <h1>My Account</h1>
      <Link to="/createreview">Create Review</Link>
      {/* <p>{user?.username}</p> */}
    </>
  );
}

export default Account;
