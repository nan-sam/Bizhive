import React from "react";
import { useNavigate } from "react-router-dom";

function BusinessCard({ business }) {
  const navigate = useNavigate();
  return (
    <div className="business-card">
      <p>{business?.businessname}</p>
      <img
        src={business?.image}
        alt={business?.businessname}
        onClick={() => navigate(`/business/${business?.id}`)}
      />
    </div>
  );
}

export default BusinessCard;
