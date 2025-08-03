import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/AllPin.css";

function AllPin() {
  const [pincodes, setPincodes] = useState([]);
console.log("check");

  useEffect(() => {
    axios
      .get("/pincode")
      .then((res) => {
        // console.log(res.data);
        setPincodes(res.data);
      })
        .catch((err) => {
          alert(err?.response?.data || "Error In Fetching Pincodes")
        // console.log();
      });
  }, []);

  return (
    <div className="all-pincode-container">
      <h2>All Pincodes</h2>
      {pincodes.length > 0 ? (
        <table className="all-pincode-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Pincode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pincodes.map((pin, idx) => (
              <tr key={idx}>
                <td>{pin.pinid}</td>
                <td>{pin.pincode}</td>
                <td>{pin.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="all-pincode-loading">pincode not listed yet..!</p>
      )}
    </div>
  );
}

export default AllPin;
