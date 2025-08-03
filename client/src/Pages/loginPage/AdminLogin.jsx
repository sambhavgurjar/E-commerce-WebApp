import React, { useState } from "react";
import axios from "../../config/axioxConfig.js";
import { useNavigate } from "react-router-dom";
import "../../css/AdminLogin.css";

function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const navigate = useNavigate();
  console.log("check");

  const handleLogin = (e) => {
    e.preventDefault();

    const admin = {
      adminId: adminId,
      adminPass: adminPass,
    };

    axios
      .post("/admin/login", admin)
      .then((res) => {
        // console.log(res.data);

        if (res.data) {
          sessionStorage.setItem("auth", JSON.stringify(res.data));
          // alert("Admin login successful");
          navigate("/admin/home");
        } else {
          alert("Invalid Admin credentials");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert(err?.response?.data || "something went wrong!");
      });
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Admin Login</h2>

      <form onSubmit={handleLogin} className="admin-login-form">
        <div className="form-group">
          <label>Admin ID:</label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
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

export default AdminLogin;
