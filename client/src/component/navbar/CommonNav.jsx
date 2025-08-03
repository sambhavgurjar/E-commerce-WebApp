import React,{useState,useEffect} from "react";
import { Link ,useNavigate,useLocation} from "react-router-dom";
import "../../css/CommonNav.css";
import { jwtDecode } from "jwt-decode";

function CommonNav() {
  // const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("check");
  
  useEffect(() => {
    let isData = JSON.parse(sessionStorage.getItem("auth"));
    // console.log(isData);
   
    
    if (isData) {
      isData = jwtDecode(isData?.token);
      navigate(`/${isData?.role}/home`)
      
    }
  },[navigate,location.pathname])

  return (
    <nav className="common-nav">
         <div className="common-nav-logo">
              <Link to="/" className="brand-name">
                <p>🛒 MyShop</p>
              </Link>
            </div>

      <ul className="common-nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/home/products">Products</Link>
        </li>
        {/* <li>
          <Link to="/home/cart">Cart</Link>
        </li> */}
      </ul>

      <div className="common-nav-auth">
        <Link to="/home/login">Login</Link>
        <Link to="/home/register">Register</Link>
      </div>
    </nav>
  );
}

export default CommonNav;
