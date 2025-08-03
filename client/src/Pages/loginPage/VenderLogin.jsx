import React, { useState } from "react";
import axios from "../../config/axioxConfig.js";
import { useNavigate } from "react-router-dom";
import "../../css/VenderLogin.css";

function VendorLogin() {
  const [VUserId, setVUserId] = useState("");
  const [VUserPass, setVUserPass] = useState("");
  const navigate = useNavigate();
console.log("check");

  const handleLogin = (e) => {
    e.preventDefault();

    const vendor = {
      vuid:VUserId,
      vupass:VUserPass,
    };

    axios
      .post("/vendor/login", vendor)
      .then((res) => {
        console.log(res.data);
        
        if (res.data.status === "deactive") {
          alert("User Not Active ,Please wait For Admin Activation Process");
          return;

        }
          sessionStorage.setItem("auth", JSON.stringify(res.data));
          // alert("Login successful");
          navigate("/vendor/home");
       
      })
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data || "Something Went Wrong !");
      });
  };

  return (
    <div className="vendor-login-container">
      <h2 className="vendor-login-title">Vendor Login</h2>

      <form onSubmit={handleLogin} className="vendor-login-form">
        <div className="form-group">
          <label>Vendor User ID:</label>
          <input
            type="text"
            value={VUserId}
            onChange={(e) => setVUserId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={VUserPass}
            onChange={(e) => setVUserPass(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
}

export default VendorLogin;
