import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../../css/ProductCatgMgt.css"

function ProductCatgMgt() {
  console.log("check");
  
  return (
    <div className="product-catg-container">
      <h2>Product Category Management</h2>
      <ul className="product-catg-nav">
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
      <div className="product-catg-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default ProductCatgMgt;
