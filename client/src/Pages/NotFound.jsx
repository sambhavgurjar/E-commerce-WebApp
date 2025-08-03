import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotFound.css";
import { jwtDecode } from "jwt-decode";
function NotFound() {
  console.log("check");

  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    let data = JSON.parse(sessionStorage.getItem("auth"));
    return jwtDecode(data?.token);
  });
  const handleHome = () => {
    // console.log(user);

    if (user) {
      navigate(`/${user?.role}/home`);
      // return;
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <button onClick={handleHome}>🔙 Go to Home</button>
      </div>
    </div>
  );
}

export default NotFound;
