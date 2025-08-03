import React, { useState } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/NewState.css"; // ✅ Import CSS

function NewState() {
  const [stName, setStName] = useState("");
  const [status, setStatus] = useState("enable");
  console.log("check");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newState = {
      stname: stName,
      status: status,
    };

    axios
      .post("/state", newState)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert("Failed to save state");
      });

    setStName("");
    setStatus("enable");
  };

  return (
    <form className="new-state-form" onSubmit={handleSubmit}>
      <h2>Add New State</h2>

      <div>
        <label htmlFor="stateName">State Name:</label>
        <input
          type="text"
          id="stateName"
          value={stName}
          onChange={(e) => setStName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="enable">Enable</option>
          <option value="disable">Disable</option>
        </select>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}

export default NewState;
