import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../../css/CityMgt.css"; 

function CityMgt() {
  console.log("check");

  return (
    <div className="city-mgt-container">
      <h2>City Management</h2>
      <ul className="city-mgt-nav">
        <li>
          <Link to="show-all">Show All</Link>
        </li>
        <li>
          <Link to="new">New</Link>
        </li>
        <li>
          <Link to="update">Search & Update</Link>
        </li>
      </ul>
      <div className="city-mgt-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default CityMgt;
