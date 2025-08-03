import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/CustomerMgt.css";

function CustomerMgt() {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchId, setSearchId] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  //   const [updatedStatus, setUpdatedStatus] = useState("enable");
console.log("check");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("/customer")
      .then((res) => {
        setCustomers(res.data);
        setFilteredCustomers(res.data);
      })
      .catch((err) => alert("Failed to fetch customers: " + err));
  };

  useEffect(() => {
    let result = [...customers];
    if (filter !== "All") {
      result = result.filter((c) => c.Status === filter);
    }
    setFilteredCustomers(result);
  }, [filter, customers]);

  useEffect(() => {
    let result = [...customers];
    if (searchId) {
      result = result.filter((c) => c.Cid === Number(searchId));
    }
    setFilteredCustomers(result);
  }, [searchId, customers]);

  const setStatus = (customer, newStatus) => {
    if (!window.confirm(`want to ${newStatus} customer?`)) {
      return;
    }
    axios
      .put(`/customer/${customer._id}`,{Status:newStatus})
      .then((res) => {
        alert(`Customer ${customer.Cid} is now ${newStatus}`);
             let email = customer.CEmail;
                const subject = `Customer Account ${
                  newStatus === "active" ? "Activated" : "Deactivated"
                }`;
        
                const text = `Dear ${customer.CUserName},\nYour vendor account has been ${newStatus === "active" ? "activated" : "deactived"}.\nFor help, contact us at support@domainName.com.\nBest regards,\nMyShop Team`;
        
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
        fetchCustomers();
      })
      .catch((err) => alert("Error updating customer."));
  };

  return (
    <div className="customer-mgt-container">
      <h2>Customer Management</h2>

      <div className="controls">
        <div className="control-group">
          <label>Status Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="active">Activated</option>
            <option value="deactive">Deactivated</option>
          </select>
        </div>

        <div className="control-group">
          <label>Search by Customer ID:</label>
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Customer ID"
          />
        </div>
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((c) => (
              <tr key={c.Cid}>
                <td>{c.Cid}</td>
                <td>{c.CUserId}</td>
                <td>{c.CUserName}</td>
                <td>{c.CEmail}</td>
                <td>{c.CContact}</td>
                <td>{c.Status}</td>
                <td>
                  {c.Status !== "active" ? (
                    <button
                      className="btn activate"
                      onClick={() => setStatus(c, "active")}
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      className="btn deactivate"
                      onClick={() => setStatus(c, "deactive")}
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerMgt;
