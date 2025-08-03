import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../../css/StateMgt.css"; 

function StateMgt() {
  console.log("check");

  return (
    <div className="state-mgt-container">
      <h2>State Management</h2>
      <ul className="state-mgt-nav">
        <li>
          <Link to="Show-all">Show All</Link>
        </li>
        <li>
          <Link to="new">New</Link>
        </li>
        <li>
          <Link to="update">Search & Update</Link>
        </li>
      </ul>
      <div className="state-mgt-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default StateMgt;
