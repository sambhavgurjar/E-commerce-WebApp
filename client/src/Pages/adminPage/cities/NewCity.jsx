import React, { useState, useEffect } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/NewCity.css";

function NewCity() {
  const [ctName, setCtName] = useState("");
  const [stid, setStid] = useState("");
  const [pinid, setPinid] = useState("");
  const [status, setStatus] = useState("enable");

  const [stateList, setStateList] = useState([]);
  const [pinList, setPinList] = useState([]);
  console.log("check");

  useEffect(() => {
    axios
      .get("/state")
      .then((res) => setStateList(res.data))
      .catch((err) => console.error("Failed to fetch states:", err));

    axios
      .get("/pincode")
      .then((res) => setPinList(res.data))
      .catch((err) => console.error("Failed to fetch pincodes:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCity = {
      ctname: ctName,
      stid: stid,
      pinid: pinid,
      status,
    };

    axios
      .post("/city", newCity)
      .then((res) => {
        alert(res.data);
        setCtName("");
        setStid("");
        setPinid("");
        setStatus("enable");
      })
      .catch((err) => {
        alert("Failed to save city");
        console.error(err);
      });
  };

  return (
    <form className="new-city-form" onSubmit={handleSubmit}>
      <h2>Add New City</h2>

      <div className="form-group">
        <label htmlFor="stid">Select State:</label>
        <select
          id="stid"
          value={stid}
          onChange={(e) => setStid(e.target.value)}
          required
        >
          <option value="">Select State</option>
          {stateList.map((state) => (
            <option key={state._id} value={state._id}>
              {state.stname}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pinid">Select Pincode:</label>
        <select
          id="pinid"
          value={pinid}
          onChange={(e) => setPinid(e.target.value)}
          required
        >
          <option value="">Select Pincode</option>
          {pinList.map((pin, idx) => (
            <option key={idx} value={pin._id}>
              {pin.pincode}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="ctname">City Name:</label>
        <input
          type="text"
          id="ctname"
          value={ctName}
          onChange={(e) => setCtName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
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

      <button type="submit" className="btn-submit">
        Save
      </button>
    </form>
  );
}

export default NewCity;
