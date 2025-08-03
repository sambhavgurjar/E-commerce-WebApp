import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/AllCity.css";

function AllCity() {
  const [cities, setCities] = useState([]);
  console.log("check");

  useEffect(() => {
    axios
      .get("/city")
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <div className="all-city-container">
      <h2>All Cities</h2>
      {cities.length > 0 ? (
        <table className="all-city-table">
          <thead>
            <tr>
              <th>City ID</th>
              <th>City Name</th>
              <th>State Name</th>
              <th>Pincode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, idx) => (
              <tr key={idx}>
                <td>{city.ctid}</td>
                <td>{city.ctname}</td>
                <td>{city?.stid?.stname}</td>
                <td>{city?.pinid?.pincode}</td>

                <td>{city.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="all-city-loading">City not listed yet..!</p>
      )}
    </div>
  );
}

export default AllCity;
