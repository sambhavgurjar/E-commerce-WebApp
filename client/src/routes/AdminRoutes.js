import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const AdminHome = lazy(() => import("../Pages/homePage/AdminHome"));
const StateMgt = lazy(() => import("../Pages/adminPage/states/StateMgt.jsx"));
const AllState = lazy(() => import("../Pages/adminPage/states/AllState.jsx"));
const NewState = lazy(() => import("../Pages/adminPage/states/NewState.jsx"));
const UpdateState = lazy(() =>
  import("../Pages/adminPage/states/UpdateState.jsx")
);

const CityMgt = lazy(() => import("../Pages/adminPage/cities/CityMgt.jsx"));
const AllCity = lazy(() => import("../Pages/adminPage/cities/AllCity.jsx"));
const NewCity = lazy(() => import("../Pages/adminPage/cities/NewCity.jsx"));
const UpdateCity = lazy(() =>
  import("../Pages/adminPage/cities/UpdateCity.jsx")
);

const PinMgt = lazy(() => import("../Pages/adminPage/pincode/PinMgt.jsx"));
const AllPin = lazy(() => import("../Pages/adminPage/pincode/AllPin.jsx"));
const NewPin = lazy(() => import("../Pages/adminPage/pincode/NewPin.jsx"));
const UpdatePin = lazy(() =>
  import("../Pages/adminPage/pincode/UpdatePin.jsx")
);

const ProductCatgMgt = lazy(() =>
  import("../Pages/adminPage/productCatg/ProdcutCatgmgt.jsx")
);
const AllProductCatg = lazy(() =>
  import("../Pages/adminPage/productCatg/AllProductCatg.jsx")
);
const NewProductCatg = lazy(() =>
  import("../Pages/adminPage/productCatg/NewProductCatg.jsx")
);
const UpdateProductCatg = lazy(() =>
  import("../Pages/adminPage/productCatg/UpdateProductCatg.jsx")
);

const VendorMgt = lazy(() => import("../Pages/adminPage/vendor/VenderMgt.jsx"));
const CustomerMgt = lazy(() =>
  import("../Pages/adminPage/customer/CustomerMgt.jsx")
);
const AdminProduct = lazy(() =>
  import("../Pages/adminPage/product/AdminProduct.jsx")
);
const AdminOrder = lazy(() =>
  import("../Pages/adminPage/order/AdminOrders.jsx")
);
const AdminBill = lazy(() => import("../Pages/adminPage/bill/AdminBill.jsx"));
const AboutUs = lazy(() => import("../Pages/AboutUs.jsx"));
const ContactUs = lazy(() => import("../Pages/ContactUs.jsx"));
const NotFound = lazy(() => import("../Pages/NotFound.jsx"));

export default function AdminRoute() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          ⏳ Loading Admin Panel...
        </div>
      }
    >
      <Routes>
        <Route path="home" element={<AdminHome />} />

        <Route path="state" element={<StateMgt />}>
          <Route path="show-all" element={<AllState />} />
          <Route path="new" element={<NewState />} />
          <Route path="update" element={<UpdateState />} />
        </Route>

        <Route path="city" element={<CityMgt />}>
          <Route path="show-all" element={<AllCity />} />
          <Route path="new" element={<NewCity />} />
          <Route path="update" element={<UpdateCity />} />
        </Route>

        <Route path="pincode" element={<PinMgt />}>
          <Route path="show-all" element={<AllPin />} />
          <Route path="new" element={<NewPin />} />
          <Route path="update" element={<UpdatePin />} />
        </Route>

        <Route path="product-category" element={<ProductCatgMgt />}>
          <Route path="show-all" element={<AllProductCatg />} />
          <Route path="new" element={<NewProductCatg />} />
          <Route path="update" element={<UpdateProductCatg />} />
        </Route>

        <Route path="vendor" element={<VendorMgt />} />
        <Route path="customer" element={<CustomerMgt />} />
        <Route path="product-list" element={<AdminProduct />} />
        <Route path="orders" element={<AdminOrder />} />
        <Route path="bills" element={<AdminBill />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
