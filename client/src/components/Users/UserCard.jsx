import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <Link to={`/users/${user?.id}`}>
        <p>{user?.username}</p>
      </Link>
    </div>
  );
}

export default UserCard;
