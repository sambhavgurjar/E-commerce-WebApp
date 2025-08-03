import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import NotFound from "./Pages/NotFound.jsx";
import CommonHome from "./Pages/homePage/CommonHome.jsx";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute userRole="admin">
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
    
        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute userRole="vendor">
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

        <Route
          path="/customer/*"
          element={
            <ProtectedRoute userRole="customer">
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

        <Route
          path="/home/*"
            element={
            <div className="app-wrapper">
              <CommanNav />
              <div className="main-content">
                <CommonRoute />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="app-wrapper">
              <CommanNav />
              <div className="main-content">
                <CommonHome />
              </div>
              <Footer />
            </div>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
