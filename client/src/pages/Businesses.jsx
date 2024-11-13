import axios from "axios";
import BusinessCardList from "../components/Businesses/BusinessCardList";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [businessToShow, setBusinessToShow] = useState([]);

  useEffect(() => {
    axios(`${BASE_URL}/business`)
      .then((response) => {
        setBusinesses(response.data);
        console.log(businesses);
        setBusinessToShow(response.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const businessSearch = (e) => {
    const searchResults = businesses.filter((businesses) =>
      businesses.businessname
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
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
        <BusinessCardList businesses={businessToShow} />
      </div>
    </>
  );
}

export default Businesses;
