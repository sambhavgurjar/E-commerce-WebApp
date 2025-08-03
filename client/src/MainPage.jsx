import React, { useState, useEffect } from "react";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import CommanNav from "./component/navbar/CommonNav.jsx";
import Footer from "./component/footer/Footer.jsx";
import AdminRoute from "./routes/AdminRoutes.js";
import AdminNav from "./component/navbar/AdminNav.jsx";
import VendorNav from "./component/navbar/VendorNav.jsx";
import VendorRoute from "./routes/VendorRoute.js";
import CommonRoute from "./routes/CommonRoute.js";
import CustomerNav from "./component/navbar/CustomerNav.jsx";
import CustomerRoute from "./routes/CustomerRoute.js";
import Unauthorized from "./Pages/Unauthorize.jsx";

export default function MainPage() {
  const [user, setUser] = useState("");
  useEffect(() => {
    let cData = JSON.parse(sessionStorage.getItem("auth"));
    setUser(cData);
  }, []);

  return (
    <Router>
      {/* <AppRoutes/> */}

      <Routes>
        {user?.role === "admin" && (
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute userRole={"admin"}>
                <div className="app-wrapper">
                  <AdminNav />
                  <div className="main-content">
                    <AdminRoute />
                  </div>

                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        )}
        {user?.role==="vender" && (
          <Route
            path="/vendor/*"
            element={
              <ProtectedRoute userRole={"vender"}>
                <div className="app-wrapper">
                  <VendorNav />
                  <div className="main-content">
                    <VendorRoute />
                  </div>
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        )}
        {user?.role==="customer" && (
          <Route
            path="/customer/*"
            element={
              <ProtectedRoute userRole={"customer"}>
                <div className="app-wrapper">
                  <CustomerNav />
                  <div className="main-content">
                    <CustomerRoute />
                  </div>
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        )}

        {!user.role && (
          <Route
            path="/*"
            element={
              <ProtectedRoute userRole={"common"}>
                <div className="app-wrapper">
                  <CommanNav />
                  <div className="main-content">
                    <CommonRoute />
                  </div>

                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        )}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

reportWebVitals();
