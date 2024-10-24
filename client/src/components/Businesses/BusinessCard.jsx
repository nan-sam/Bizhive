import React from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.DATABASE_URL;

function BusinessCard({ business }) {
  return (
    <div className="business-card">
      <p>{business?.businessname}</p>
      <p></p>
    </div>
  );
}

export default BusinessCard;
