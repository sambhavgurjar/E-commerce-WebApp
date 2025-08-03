import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const VenderHome = lazy(() => import("../Pages/homePage/VenderHome.jsx"));
const UploadProduct = lazy(() =>
  import("../Pages/vendorPage/product/UploadProduct.jsx")
);
const AllProduct = lazy(() =>
  import("../Pages/vendorPage/product/AllProducts.jsx")
);
const VendorProfile = lazy(() =>
  import("../Pages/vendorPage/VendorProfile.jsx")
);
const VendorOrder = lazy(() => import("../Pages/vendorPage/VendorOrder.jsx"));
const VendorBills = lazy(() => import("../Pages/vendorPage/VendorBills.jsx"));

const AboutUs = lazy(() => import("../Pages/AboutUs.jsx"));
const ContactUs = lazy(() => import("../Pages/ContactUs.jsx"));
const NotFound = lazy(() => import("../Pages/NotFound.jsx"));

export default function VendorRoute() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          ⏳ Loading page...
        </div>
      }
    >
      <Routes>
        <Route path="home" element={<VenderHome />} />
        <Route path="upload-product" element={<UploadProduct />} />
        <Route path="products" element={<AllProduct />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="orders" element={<VendorOrder />} />
        <Route path="bills" element={<VendorBills />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
