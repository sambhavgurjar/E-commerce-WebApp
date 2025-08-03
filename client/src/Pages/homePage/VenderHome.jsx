import React from "react";
import { Link } from "react-router-dom";
import "../../css/VenderHome.css"; 
import { jwtDecode } from "jwt-decode";

function VendorHome() {
  let vendorData = JSON.parse(sessionStorage.getItem("auth"));
  vendorData = jwtDecode(vendorData?.token)

  console.log("check");
  
  return (
    <div className="vendor-home">
      <h2>Welcome, {vendorData?.VUserName || "Vendor"} 🏪</h2>

      <div className="vendor-home-actions">
        <Link to="/vendor/upload-product" className="vendor-btn">
          📤 Upload Product
        </Link>
        <Link to="/vendor/products" className="vendor-btn">
          📦 View My Products
        </Link>
        <Link to="/vendor/orders" className="vendor-btn">
          🧾 Manage Orders
        </Link>
        <Link to="/vendor/bills" className="vendor-btn">
          🧾 Manage Bills
        </Link>
        <Link to="/vendor/profile" className="vendor-btn">
          👤 Profile
        </Link>
      </div>
    </div>
  );
}

export default VendorHome;
