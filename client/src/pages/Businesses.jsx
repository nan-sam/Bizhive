import BusinessCard from "../components/Businesses/BusinessCard";
import { useState } from "react";
function Businesses({ businesses }) {
  const [businessToShow, setBusinessToShow] = useState([]);
  const businessSearch = (e) => {
    const searchResults = businesses.find((business) =>
      business.businessname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBusinessToShow(searchResults);
  };

  return (
    <>
      <div>
        <label className="search-styles">
          <input
            className="search-box"
            type="text"
            placeholder="Search For Business Here"
            onChange={businessSearch}
          ></input>
        </label>
      </div>
      <div className="business-container">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </>
  );
}

export default Businesses;
