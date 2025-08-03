import React from "react";
import { useNavigate ,Outlet} from "react-router-dom";
import "../../css/Login.css"; 

function Login() {
  const navigate = useNavigate();
  console.log("check");
  

  return (
    <div className="login-page-container">
      <h2 className="login-title">Select Login Portal</h2>

      <div className="login-button-group">
        <button
          onClick={() => navigate("/home/login/vendor")}
          className="login-btn vendor"
        >
          Vendor Login
        </button>

        <button
          onClick={() => navigate("/home/login/customer")}
          className="login-btn customer"
        >
          Customer Login
        </button>

        <button
          onClick={() => navigate("/home/login/admin")}
          className="login-btn admin"
        >
          Admin Login
        </button>
      </div>
      <div className="login-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Login;
