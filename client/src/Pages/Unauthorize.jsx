import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Unauthorize.css";
import { jwtDecode } from "jwt-decode";
function Unauthorized() {
  console.log("check");

  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    let data = JSON.parse(sessionStorage.getItem("auth"));
    return jwtDecode(data?.token);
  });
  const handleHome = () => {
    console.log(user);

    if (user) {
      navigate(`/${user?.role}/home`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="unauth-container">
      <div className="unauth-card">
        <h1>🚫 Unauthorized Access</h1>
        <p>You do not have permission to view this page.</p>
        <button onClick={handleHome}>🔙 Go to Home</button>
      </div>
    </div>
  );
}

export default Unauthorized;
