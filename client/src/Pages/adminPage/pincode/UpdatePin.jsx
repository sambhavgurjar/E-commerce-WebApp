import React, { useState } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/UpdatePin.css"; 

function UpdatePin() {
  const [searchId, setSearchId] = useState("");
  const [pinData, setPinData] = useState(null);
  const [updatedcode, setUpdatedcode] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("enable");
console.log("check");

    const handleSearch = () => {
        if (!searchId) {
            alert("please enter id!");
            return;
      }
    axios
      .get(`/pincode/pinid/${searchId}`)
      .then((res) => {
        setPinData(res.data);
        setUpdatedcode(res.data.pincode);
        setUpdatedStatus(res.data.status);
      })
      .catch(() => {
        alert("Pincode not found.");
        setPinData(null);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      pinname: updatedcode,
      status: updatedStatus,
    };

    axios
      .put(`/pincode/${pinData._id}`, updatedData)
      .then(() => {
        alert("Pincode updated successfully!");
        resetForm();
      })
      .catch(() => {
        alert("Update failed.");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this pincode?")) {
      axios
        .delete(`/pincode/${pinData._id}`)
        .then(() => {
          alert("Pincode deleted.");
          resetForm();
        })
        .catch(() => {
          alert("Delete failed.");
        });
    }
  };

  const resetForm = () => {
    setSearchId("");
    setPinData(null);
    setUpdatedcode("");
    setUpdatedStatus("enable");
  };

  return (
    <div className="pin-update-wrapper">
      <h2 className="pin-title">Update / Delete Pincode</h2>

      <div className="search-box">
        <input
          type="number"
          placeholder="Enter Pincode ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {pinData && (
        <form className="update-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              value={updatedcode}
              onChange={(e) => setUpdatedcode(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn-primary">
              Update
            </button>
            <button type="button" onClick={handleDelete} className="btn-danger">
              Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdatePin;
