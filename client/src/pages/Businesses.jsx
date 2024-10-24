import { useEffect, useState } from "react";
import BusinessCard from "../components/Businesses/BusinessCard";
import { Link } from "react-router-dom";

function Businesses({ businesses }) {
  // const navigate = useNavigate();

  // onClick={() => navigate(`/business/${business.id}`)}
  return (
    <div className="business-container">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}

export default Businesses;
