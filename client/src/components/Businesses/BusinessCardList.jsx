import React from "react";
import BusinessCard from "./BusinessCard";

function BusinessCardList({ businesses }) {
  return (
    <div className="business-container">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}

export default BusinessCardList;
