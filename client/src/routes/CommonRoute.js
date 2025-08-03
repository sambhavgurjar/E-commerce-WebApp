import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const CommonHome = lazy(() => import("../Pages/homePage/CommonHome"));
const Login = lazy(() => import("../Pages/loginPage/Login"));
const VendorLogin = lazy(() => import("../Pages/loginPage/VenderLogin"));
const CustomerLogin = lazy(() => import("../Pages/loginPage/CustomerLogin"));
const AdminLogin = lazy(() => import("../Pages/loginPage/AdminLogin"));

const Register = lazy(() => import("../Pages/registerPage/Register"));
const CustomerReg = lazy(() => import("../Pages/registerPage/CustomerReg"));
const VenderReg = lazy(() => import("../Pages/registerPage/VendorReg"));

const BrowseProduct = lazy(() => import("../Pages/customer/BrowseProduct"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));
const ContactUs = lazy(() => import("../Pages/ContactUs"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const Unauthorized = lazy(() => import("../Pages/Unauthorize"));

export default function CommonRoute() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          ⏳ Loading page...
        </div>
      }
    >
      <Routes>
        <Route path="" element={<CommonHome />} />
        <Route path="products" element={<BrowseProduct />} />

        <Route path="login" element={<Login />} />
        <Route path="login/vendor" element={<VendorLogin />} />
        <Route path="login/customer" element={<CustomerLogin />} />
        <Route path="login/admin" element={<AdminLogin />} />

        <Route path="register" element={<Register />} />
        <Route path="register/customer" element={<CustomerReg />} />
        <Route path="register/vendor" element={<VenderReg />} />

        <Route path="admin/*" element={<Unauthorized />} />
        <Route path="vendor/*" element={<Unauthorized />} />
        <Route path="customer/*" element={<Unauthorized />} />

        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
