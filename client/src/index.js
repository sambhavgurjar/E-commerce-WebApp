import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// import AppRoutes from './routes/AppRoutes';
import "./index.css";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <App/>
  // <Router>
  //   {/* <AppRoutes/> */}

  //   <Routes>
  //     <Route
  //       path="/admin/*"
  //       element={
  //         <ProtectedRoute userRole={"admin"}>
  //           <div className="app-wrapper">
  //             <AdminNav />
  //             <div className="main-content">
  //               <AdminRoute />
  //             </div>

  //             <Footer />
  //           </div>
  //         </ProtectedRoute>
  //       }
  //     />
  //     <Route
  //       path="/vendor/*"
  //       element={
  //         <ProtectedRoute userRole={"vender"}>
  //           <div className="app-wrapper">
  //             <VendorNav />
  //             <div className="main-content">
  //               <VendorRoute />
  //             </div>
  //             <Footer />
  //           </div>
  //         </ProtectedRoute>
  //       }
  //     />
  //     <Route
  //       path="/customer/*"
  //       element={
  //         <ProtectedRoute userRole={"customer"}>
  //           <div className="app-wrapper">
  //             <CustomerNav />
  //             <div className="main-content">
  //               <CustomerRoute />
  //             </div>
  //             <Footer />
  //           </div>
  //         </ProtectedRoute>
  //       }
  //     />
  //     <Route
  //       path="/*"
  //       element={
  //         <ProtectedRoute userRole={"common"}>
  //           <div className="app-wrapper">
  //             <CommanNav />
  //             <div className="main-content">
  //               <CommonRoute />
  //             </div>

  //             <Footer />
  //           </div>
  //         </ProtectedRoute>
  //       }
  //     />
  //     <Route path="/unauthorized" element={<Unauthorized />} />
  //   </Routes>
  // </Router>
);

reportWebVitals();
