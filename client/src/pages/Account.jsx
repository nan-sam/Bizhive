import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Account({ auth }) {
  return (
    <>
      <h1>My Account</h1>

      <h2>Welcome, {auth?.username}!</h2>
      <h3>Your favorite businesses</h3>
      <h3>Notification Status</h3>
    </>
  );
}

export default Account;
