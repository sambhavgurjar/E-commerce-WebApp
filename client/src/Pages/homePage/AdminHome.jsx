import React from "react";
import { Link } from "react-router-dom";
import "../../css/AdminHome.css";
import { jwtDecode } from "jwt-decode"; 

function AdminHome() {
  let admin = JSON.parse(sessionStorage.getItem("auth"));
  if(admin)admin = jwtDecode(admin?.token);
  console.log("check");

  return (
    <div className="admin-home">
      <h2>Welcome, {admin?.adminId || "Admin"} 👋</h2>

      <div className="admin-home-actions">
        <Link to="/admin/state" className="admin-btn">
          📍 Manage States
        </Link>
        <Link to="/admin/city" className="admin-btn">
          🏙️ Manage Cities
        </Link>
        <Link to="/admin/pincode" className="admin-btn">
          🏙️ Manage Pincodes
        </Link>
        <Link to="/admin/vendor" className="admin-btn">
          🏪 Manage Vendors
        </Link>
        <Link to="/admin/customer" className="admin-btn">
          👥 manage Customers
        </Link>
        <Link to="/admin/product-category" className="admin-btn">
          📦 Product Categories
        </Link>
        <Link to="/admin/product-list" className="admin-btn">
          🧾 Product List
        </Link>
        <Link to="/admin/orders" className="admin-btn">
          🧾 Order List
        </Link>
        <Link to="/admin/bills" className="admin-btn">
          🧾 Billing Records
        </Link>
      </div>
    </div>
  );
}

export default AdminHome;
