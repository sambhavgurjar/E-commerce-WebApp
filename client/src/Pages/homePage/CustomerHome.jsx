import React from "react";
import { Link } from "react-router-dom";
import "../../css/CustomerHome.css";
import { jwtDecode } from "jwt-decode";

function CustomerHome() {
  let userData = JSON.parse(sessionStorage.getItem("auth"));
  userData = jwtDecode(userData.token);
console.log("check");

  return (
    <div className="chome-container">
      <div className="chome-hero">
        <div className="chome-hero-text">
          <h1>Hi {userData?.CUserId || "Customer"} 👋</h1>
          <p>Welcome to your personalized shopping dashboard.</p>
        </div>
      </div>

      <div className="chome-actions">
        <Link to="/customer/products" className="chome-card">
          🛍️ <span>Browse Products</span>
        </Link>
        <Link to="/customer/cart" className="chome-card">
          🛒 <span>View Cart</span>
        </Link>
        <Link to="/customer/order-list" className="chome-card">
          📦 <span>Order History</span>
        </Link>
        <Link to="/customer/bills" className="chome-card">
          🧾 <span>Bill History</span>
        </Link>
        <Link to="/customer/profile" className="chome-card">
          👤 <span>Your Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default CustomerHome;
