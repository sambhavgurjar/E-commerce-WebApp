import React, { useState } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/NewPin.css";

function NewPin() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState("enable");
console.log("check");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPincode = {
      pincode: pincode,
      status: status,
    };

    axios
      .post("/pincode", newPincode)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err?.response?.data || "Failed to save pincode");
      });

    setPincode("");
    setStatus("enable");
  };

  return (
    <form className="new-pin-form" onSubmit={handleSubmit}>
      <h2>Add New Pincode</h2>

      <div>
        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          pattern="\d{6}"
          maxLength={6}
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
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

export default NewPin;
