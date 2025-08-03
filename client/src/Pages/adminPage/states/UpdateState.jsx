import React, { useState } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/UpdateState.css"; // Updated stylesheet

function UpdateState() {
    const [searchId, setSearchId] = useState("");
   
  const [stateData, setStateData] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("enable");
  console.log("check");

  const handleSearch = () => {
    axios
      .get(`/state/search/${searchId}`)
      .then((res) => {
        setStateData(res.data);
        setUpdatedName(res.data.stname);
        setUpdatedStatus(res.data.status);
      })
      .catch(() => {
        alert("State not found.");
        setStateData(null);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      stname: updatedName,
      status: updatedStatus,
    };

    axios
      .put(`/state/${stateData._id}`, updatedData)
      .then(() => {
        alert("State updated successfully!");
        resetForm();
      })
      .catch(() => {
        alert("Update failed.");
      });
  };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this state?")
    ) {
      axios
        .delete(`/state/${stateData._id}`)
        .then(() => {
          alert("State deleted.");
          resetForm();
        })
        .catch(() => {
          alert("Delete failed.");
        });
    }
  };

  const resetForm = () => {
    setSearchId("");
    setStateData(null);
    setUpdatedName("");
    setUpdatedStatus("enable");
  };

  return (
    <div className="state-update-wrapper">
      <h2 className="state-title">Update / Delete State</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter State ID"
          value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {stateData && (
        <form className="update-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>State Name</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
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

export default UpdateState;
