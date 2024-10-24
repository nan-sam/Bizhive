import React from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ user, auth }) {
  const navigate = useNavigate();
  return (
    <div className="user-card">
      <p>{user?.username}</p>
      <img
        src={user?.userimage}
        // alt={user?.username}
        onClick={() => navigate(`/users/${user?.id}`)}
      />
    </div>
  );
}

export default UserCard;
