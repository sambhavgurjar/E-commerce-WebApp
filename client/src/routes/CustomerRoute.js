import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const CustomerHome = lazy(() => import("../Pages/homePage/CustomerHome"));
const BrowseProduct = lazy(() => import("../Pages/customer/BrowseProduct"));
const Cart = lazy(() => import("../Pages/customer/Cart"));
const Order = lazy(() => import("../Pages/customer/Order"));
const OrderList = lazy(() => import("../Pages/customer/OrderList"));
const CustomerBills = lazy(() => import("../Pages/customer/CustomerBills"));
const CustomerProfile = lazy(() => import("../Pages/customer/CustomerProfile"));

const AboutUs = lazy(() => import("../Pages/AboutUs"));
const ContactUs = lazy(() => import("../Pages/ContactUs"));
const NotFound = lazy(() => import("../Pages/NotFound"));

export default function CustomerRoute() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          ⏳ Loading page...
        </div>
      }
    >
      <Routes>
        <Route path="home" element={<CustomerHome />} />
        <Route path="products" element={<BrowseProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<Order />} />
        <Route path="order-list" element={<OrderList />} />
        <Route path="bills" element={<CustomerBills />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
