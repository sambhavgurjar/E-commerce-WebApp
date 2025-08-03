import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/CustomerNav.css";
import {jwtDecode} from "jwt-decode";

function CustomerNav() {
  const navigate = useNavigate();
  let customer = JSON.parse(sessionStorage.getItem("auth"));
  customer = jwtDecode(customer.token);
  // console.log(customer);
  

  const userId = customer?.CUserId || "Customer";


  const handleLogin = () => {
    sessionStorage.clear("auth");
    navigate("/");
  };

  return (
    <nav className="customer-nav">
      <div className="customer-nav-logo">
        <Link to="/customer/home" className="brand-name">
          <p>🛒 MyShop</p>
        </Link>
      </div>

      <ul className="customer-nav-links">
        <li>
          <Link to="/customer/home">Home</Link>
        </li>
        <li>
          <Link to="/customer/products">Shop</Link>
        </li>
        <li>
          <Link to="/customer/cart">Cart</Link>
        </li>
        <li>
          <Link to="/customer/order-list">Orders</Link>
        </li>
        <li>
          <Link to="/customer/bills">Bills</Link>
        </li>
      </ul>

      <div className="customer-nav-auth">
        <span className="customer-username">👤 {userId}</span>
        <Link to="/customer/profile" className="profile-link">
          Profile
        </Link>
        <button onClick={handleLogin}>Logout</button>
      </div>
    </nav>
  );
}

export default CustomerNav;
