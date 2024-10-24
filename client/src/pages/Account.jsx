import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Account({ auth }) {
  return (
    <>
      <h1>My Account</h1>
      <Link to="/createreview">Create Review</Link>
      <p>Welcome, {auth.username}!</p>
    </>
  );
}

export default Account;
