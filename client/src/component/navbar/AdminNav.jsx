import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "../../css/AdminNav.css"; 

function AdminNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");

  }

  return (
    <nav className="admin-nav">
      <div className="admin-nav-logo">
             <Link to="/admin/home" className="brand-name">
               <p>🛒 MyShop</p>
             </Link>
           </div>

      <ul className="admin-nav-links">
        <li>
          <Link to="/admin/home">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/state">States</Link>
        </li>
        <li>
          <Link to="/admin/city">Cities</Link>
        </li>
        <li>
          <Link to="/admin/pincode">Pincodes</Link>
        </li>
        <li>
          <Link to="/admin/vendor">Vendors</Link>
        </li>
        <li>
          <Link to="/admin/product-category">Categories</Link>
        </li>
        <li>
          <Link to="/admin/product-list">Products</Link>
        </li>
        <li>
          <Link to="/admin/customer">Customers</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin/bills">Bills</Link>
        </li>
      </ul>

      <div className="admin-nav-auth">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default AdminNav;
