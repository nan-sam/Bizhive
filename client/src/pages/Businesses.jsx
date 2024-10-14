import { useEffect, useState } from "react";
// import BusinessCard from "./components/Businesses/BusinessCard";

function Businesses({ businesses }) {
  //   const [businesses, setBusinesses] = useState([]);
  //   useEffect(() => {
  //     const fetchBusinesses = async () => {
  //       const response = await fetch(`${BASE_URL}/business`);
  //       const businesses = await response.json();

  //       setBusinesses(businesses);
  //     };
  //     fetchBusinesses();
  //   }, []);

  return (
    <div>
      <h1>Placeholder for Businesses: {businesses.length}</h1>
      {businesses.map((business) => (
        <p>{business.businessname}</p>
      ))}
    </div>
  );
}

export default Businesses;
