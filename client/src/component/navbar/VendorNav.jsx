import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/VendorNav.css";
import { jwtDecode } from "jwt-decode";

function VendorNav() {
  const [vendorId, setVendorId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let vendor = JSON.parse(sessionStorage.getItem("auth"));
    if (vendor) vendor = jwtDecode(vendor.token);

    if (vendor && vendor?.VUserId) {
      setVendorId(vendor?.VUserId);
    }
  }, []);
  const handleLogout = () => {
    
    sessionStorage.clear("auth");
    navigate("/");
  }

  return (
    <nav className="vendor-nav">
      <div className="vendor-nav-logo">
             <Link to="/vendor/home" className="brand-name">
               <p>🛒 MyShop</p>
             </Link>
           </div>

      <ul className="vendor-nav-links">
        <li>
          <Link to="/vendor/home">Dashboard</Link>
        </li>
        <li>
          <Link to="/vendor/upload-product">Upload Product</Link>
        </li>
        <li>
          <Link to="/vendor/products">My Products</Link>
        </li>
        <li>
          <Link to="/vendor/orders">Orders</Link>
        </li>
        <li>
          <Link to="/vendor/bills">Bills</Link>
        </li>
        <li>
          <Link to="/vendor/profile">Profile</Link>
        </li>
      </ul>

      <div className="vendor-nav-auth">
        <span className="vendor-name">Hi, {vendorId || "vendorName"}</span>
        <button className="vender-logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default VendorNav;
