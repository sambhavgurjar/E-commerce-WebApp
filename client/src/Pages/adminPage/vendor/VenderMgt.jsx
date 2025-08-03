import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/VendorMgt.css";

function VendorMgt() {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchId, setSearchId] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);
  console.log("check");

  // Fetch vendors
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => {
    axios
      .get("/vendor")
      .then((res) => {
        setVendors(res.data);
        setFilteredVendors(res.data);
      })
      .catch((err) => alert("Failed to fetch vendors: " + err));
  };

  // Filter based on status
  useEffect(() => {
    let result = [...vendors];
    if (filter !== "All") {
      result = result.filter((v) => v.Status === filter);
    }
    setFilteredVendors(result);
  }, [filter, vendors]);

  // Filter based on search input
  useEffect(() => {
    let result = [...vendors];
    if (searchId) {
      result = result.filter((v) => v.Vid === Number(searchId));
    }
    setFilteredVendors(result);
  }, [searchId, vendors]);

  // Handle activate/deactivate
  const setStatus = (vendor, newStatus) => {
    if (!window.confirm(`want to ${newStatus} vendor?`)) {
      return;
    }
    axios
      .put(`/vendor/${vendor._id}`, { Status: newStatus })
      .then((res) => {
        alert(`Vendor ${vendor.Vid} is now ${newStatus}`);
        let email = vendor.VEmail;
        const subject = `Vendor Account ${
          newStatus === "active" ? "Activated" : "Deactivated"
        }`;

        const text = `Dear ${vendor.VUserName},\nYour vendor account has been ${newStatus === "active" ? "activated" : "deactived"}.\nFor help, contact us at support@domainName.com.\nBest regards,\nMyShop Team`;

        axios
          .post("/email/send/", { email, subject, text })
          .then((resp) => {
            console.log(resp.data);

            alert(resp?.data);
          })
          .catch((err) =>
            // alert(err?.response?.data || "Error registering customer ")
          {
            
              console.error(err);
            }
          );
        fetchVendors();
      })
      .catch((err) => alert("Error updating vendor"));
  };

  return (
    <div className="vendor-mgt-container">
      <h2>Vendor Management</h2>

      <div className="controls">
        <div className="control-group">
          <label>Status Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
          </select>
        </div>

        <div className="control-group">
          <label>Search by Vendor ID:</label>
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Vendor ID"
          />
        </div>
      </div>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((v) => (
              <tr key={v.Vid}>
                <td>{v.Vid}</td>
                <td>{v.VUserId}</td>
                <td>{v.VUserName}</td>
                <td>{v.VEmail}</td>
                <td>{v.VContact}</td>
                <td>{v.Status}</td>
                <td>
                  {v.Status !== "active" ? (
                    <button
                      className="btn activate"
                      onClick={() => setStatus(v, "active")}
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      className="btn deactivate"
                      onClick={() => setStatus(v, "deactive")}
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No vendors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VendorMgt;
