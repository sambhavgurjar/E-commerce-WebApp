import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/AllState.css";

function AllState() {
  const [states, setStates] = useState([]);
  console.log("check");

  useEffect(() => {
    axios
      .get("/state")
      .then((res) => {

        // console.log(res.data);
        setStates(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="all-state-container">
      <h2>All States</h2>
      {states.length > 0 ? (
        <table className="all-state-table">
          <thead>
            <tr>
              <th>State ID</th>
              <th>State Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state, idx) => (
              <tr key={idx}>
                <td>{state.stid}</td>
                <td>{state.stname}</td>
                <td>{state.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="all-state-loading">Loading...</p>
      )}
    </div>
  );
}

export default AllState;
