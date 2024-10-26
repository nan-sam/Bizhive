import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user, auth }) {
  return (
    <div className="user-card">
      <Link>
        {" "}
        <p>{user?.username}</p>
      </Link>
    </div>
  );
}

export default UserCard;
