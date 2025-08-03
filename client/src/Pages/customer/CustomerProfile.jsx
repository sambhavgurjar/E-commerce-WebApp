import { useEffect, useState } from "react";
import axios from "../../config/axioxConfig.js";
import "../../css/CustomerProfile.css";
import { jwtDecode } from "jwt-decode";

function CustomerProfile() {
  let customer = JSON.parse(sessionStorage.getItem("auth"));
  customer = jwtDecode(customer?.token);
  const [cData, setCData] = useState("");
  console.log("check");

  useEffect(() => {
    if (!customer) return;
    axios.post(`/customer/${customer._id}`).then((res) => {
      setCData(res.data);
    });
  }, []);

  if (!customer) {
    return <div className="profile-container">No customer data found.</div>;
  }

  return (
    <div className="profile-container">
      <h2>👤 My Profile</h2>
      {cData ? (
        <div className="profile-card">
          <img
            src={`http://localhost:9191/customer/getimage/${cData.CPicName}`}
            alt={cData.CUserId}
            className="profile-image"
          />
          <div className="profile-details">
            <p>
              <strong>User ID:</strong> {cData.CUserId}
            </p>
            <p>
              <strong>Name:</strong> {cData.CUserName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {cData.CEmail}
            </p>
            <p>
              <strong>Mobile:</strong> {cData.CContact || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {cData.CAddress || "N/A"}
            </p>

            <div className="profile-actions">
              <button className="edit-btn" disabled>
                ✏️ Edit Profile (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
    </div>
  );
}

export default CustomerProfile;
