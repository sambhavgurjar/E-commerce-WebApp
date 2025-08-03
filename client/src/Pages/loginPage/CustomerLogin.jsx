import React, { useState } from "react";
import "../../css/CustomerLogin.css";
import axios from "../../config/axioxConfig";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [CUserId, setCUserId] = useState("");
  const [CUserPass, setCUserPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
console.log("check");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!CUserId || !CUserPass) {
      setError("Both fields are required.");
      return;
    }
    var obj = {
      CUserId: CUserId,
      CUserPass: CUserPass,
    };

    axios
      .post("/customer/login", obj)
      .then((res) => {
        // console.log(res.data);

        // if (res.data.CUserId !== undefined) {
        //   console.log(res.data.Status);

        if (res.data.Status === "Inactive") {
          alert("User Not Active ,Please wait For Admin Activation Process");
          return;
        }
        sessionStorage.setItem("auth", JSON.stringify(res.data));

        navigate(`/customer/home`);
      })
      .catch((err) => {
        console.log(err);
        
        alert(err?.response?.data || "something went wrong !");
      });

    setError("");
  };

  return (
    <div className="customer-login-container">
      <h2 className="customer-login-title">Customer Login</h2>

      <form onSubmit={handleLogin} className="customer-login-form">
        <div className="form-group">
          <label htmlFor="CUserId">Customer User ID</label>
          <input
            type="text"
            id="CUserId"
            value={CUserId}
            onChange={(e) => setCUserId(e.target.value)}
            placeholder="Enter User ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="CUserPass">Password</label>
          <input
            type="password"
            id="CUserPass"
            value={CUserPass}
            onChange={(e) => setCUserPass(e.target.value)}
            placeholder="Enter Password"
            minLength={6}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="customer-login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default CustomerLogin;
