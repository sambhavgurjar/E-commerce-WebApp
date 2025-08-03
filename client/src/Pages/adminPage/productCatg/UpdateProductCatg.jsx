import React, { useState } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/UpdateProductCatg.css";

function UpdateProductCatg() {
  const [searchId, setSearchId] = useState("");
  const [categoryData, setCategoryData] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  console.log("check");

  const handleSearch = () => {
    axios
      .get(`/productcatg/search/${searchId}`)
      .then((res) => {
        // console.log(res.data);

        setCategoryData(res?.data);
        setUpdatedName(res?.data?.pcatgname);
        //   setUpdatedStatus(res.data.status);
      })
      .catch((err) => {
        alert(err?.response?.data || "Error searching category.");
        resetForm();
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      pcatgname: updatedName,
    };

    axios
      .put(`/productcatg/${categoryData._id}`, updatedData)
      .then((res) => {
        alert(res.data || "Product Category updated successfully!");
        resetForm();
      })
      .catch((err) => {
        alert(err?.response?.data || "Error searching category.");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to disable this category?")) {
      axios
        .delete(`/productcatg/${categoryData._id}`)
        .then((res) => {
          alert(res.data ||"Category deleted.");
          resetForm();
        })
        .catch((err) => {
        alert(err?.response?.data || "Error searching category.");

        });
    }
  };

  const resetForm = () => {
    setSearchId("");
    setCategoryData(null);
    setUpdatedName("");
    // setUpdatedStatus("enable");
  };

  return (
    <div className="update-catg-wrapper">
      <h2 className="catg-title">Update / Delete Product Category</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Category ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {categoryData && (
        <form className="update-catg-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Category Name:</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              required
            />
          </div>

          {/* <div className="form-group">
            <label>Status:</label>
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div> */}

          <div className="btn-group">
            <button type="submit" className="btn-update">
              Update
            </button>
            <button type="button" onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdateProductCatg;
