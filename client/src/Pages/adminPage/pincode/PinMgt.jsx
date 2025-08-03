import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../../css/PinMgt.css"; 

function PinMgt() {
  console.log("check");
  
  return (
    <div className="pincode-mgt-container">
      <h2>Pincode Management</h2>
      <ul className="pincode-mgt-nav">
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
      <div className="pincode-mgt-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default PinMgt;
