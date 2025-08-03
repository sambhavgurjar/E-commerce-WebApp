import React, { useEffect, useState } from "react";
import "../../css/VenderProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axioxConfig.js";
import { jwtDecode } from "jwt-decode";
function VendorProfile() {
  const [vendor, setVendor] = useState(null);
  const navigate = useNavigate();
  console.log("check");
  

  useEffect(() => {
    let vendorData = JSON.parse(sessionStorage.getItem("auth"));
    vendorData = jwtDecode(vendorData?.token);
    axios.post(`/vendor/${vendorData._id}`).then((res) => {
      setVendor(res.data);
    });
  }, []);

  const handleEdit = () => {

    // navigate("/vendor/edit-profile");
  };

  return (
    <div className="vendor-profile-container">
      <h2 className="vendor-profile-title">Vendor Profile</h2>

      {vendor ? (
        <div className="vendor-profile-card">
          <div className="vendor-profile-image">
            <img
              src={`http://localhost:9191/vendor/getimage/${vendor.VPicName}`}
              alt="Vendor"
            />
          </div>

          <div className="vendor-profile-row">
            <label>Vendor ID:</label>
            <span>{vendor.VUserId}</span>
          </div>
          <div className="vendor-profile-row">
            <label>Vendor Name:</label>
            <span>{vendor.VUserName}</span>
          </div>
          <div className="vendor-profile-row">
            <label>Email:</label>
            <span>{vendor.VEmail}</span>
          </div>
          <div className="vendor-profile-row">
            <label>Mobile:</label>
            <span>{vendor.VContact}</span>
          </div>
          <div className="vendor-profile-row">
            <label>Status:</label>
            <span>{vendor.Status || "Active"}</span>
          </div>

          <button className="edit-btn" onClick={handleEdit} disabled>
            Edit Profile(comming soon)
          </button>
        </div>
      ) : (
        <p className="vendor-profile-loading">Vendor data not available.</p>
      )}
    </div>
  );
}

export default VendorProfile;
