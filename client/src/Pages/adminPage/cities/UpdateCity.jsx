import React, { useState, useEffect } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/UpdateCity.css";

function UpdateCity() {
  const [searchId, setSearchId] = useState("");
  const [cityData, setCityData] = useState(null);
  const [updatedCtName, setUpdatedCtName] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("enable");
  const [updatedStid, setUpdatedStid] = useState("");
  const [updatedPinid, setUpdatedPinid] = useState("");
  const [stateList, setStateList] = useState([]);
  const [pinList, setPinList] = useState([]);
  console.log("check");

  useEffect(() => {
    axios
      .get("/state")
      .then((res) => setStateList(res.data))
      .catch((err) => alert(err?.response?.data || "Something Went Wrong"));
    axios
      .get("/pincode")
      .then((res) => setPinList(res.data))
      .catch((err) => alert(err?.response?.data || "Something Went Wrong"));

  }, []);

  const handleSearch = () => {
    axios
      .get(`/city/search/${searchId}`)
      .then((res) => {
        const city = res.data;
        setCityData(city);
        setUpdatedCtName(city.ctname);
        setUpdatedStatus(city.status);
        setUpdatedStid(city.stid._id);
        setUpdatedPinid(city.pinid._id);
      })
      .catch(() => {
        alert("City not found.");
        setCityData(null);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedCity = {
      ctname: updatedCtName,
      status: updatedStatus,
      stid: updatedStid,
      pinid: updatedPinid,
    };

    axios
      .put(`/city/${cityData._id}`, updatedCity)
      .then(() => {
        alert("City updated successfully!");
        resetForm();
      })
      .catch(() => {
        alert("Update failed.");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      axios
        .delete(`/city/${cityData._id}`)
        .then(() => {
          alert("City deleted.");
          resetForm();
        })
        .catch(() => {
          alert("Delete failed.");
        });
    }
  };

  const resetForm = () => {
    setSearchId("");
    setCityData(null);
    setUpdatedCtName("");
    setUpdatedStatus("enable");
    setUpdatedStid("");
    setUpdatedPinid("");
  };

  return (
    <div className="city-update-wrapper">
      <h2 className="city-title">Update / Delete City</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {cityData && (
        <form className="update-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>City Name</label>
            <input
              type="text"
              value={updatedCtName}
              onChange={(e) => setUpdatedCtName(e.target.value)}
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

          <div className="form-group">
            <label>State</label>
            <select
              value={updatedStid}
              onChange={(e) => setUpdatedStid(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {stateList.map((st) => (
                <option key={st._id} value={st._id}>
                  {st.stname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <select
              value={updatedPinid}
              onChange={(e) => setUpdatedPinid(e.target.value)}
              required
            >
              <option value="">Select Pincode</option>
              {pinList.map((pin,idx) => (
                <option key={idx} value={pin._id}>
                  {pin.pincode}
                </option>
              ))}
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

export default UpdateCity;
