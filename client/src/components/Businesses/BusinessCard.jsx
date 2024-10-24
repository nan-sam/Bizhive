import React from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.DATABASE_URL;

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
