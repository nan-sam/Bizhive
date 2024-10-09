import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.DATABASE_URL;

function BusinessCard() {
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    const fetchBusinesses = async () => {
      const response = await fetch(`${BASE_URL}/api/business`);
      const businesses = await response.json();
      setBusinesses(businesses);
    };
    fetchBusinesses();
  }, []);

  return (
    <div>
      <h1>Businesses</h1>
      <ul>
        {businesses.map((business) => {
          return <li key={business.id}>{business.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default BusinessCard;
