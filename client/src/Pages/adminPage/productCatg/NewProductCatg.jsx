import React, { useState } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/NewProductCatg.css";

function NewProductCatg() {
  const [pcatgname, setPcatgName] = useState("");
  console.log("check");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      pcatgname: pcatgname,
    };

    axios
      .post("/productcatg", newCategory)
      .then((res) => {
        alert(res.data);
        setPcatgName("");
      })
      .catch((err) => {
        alert(err?.response?.data || "Failed to save category.");
        console.error(err);
      });
  };

  return (
    <form className="new-catg-form" onSubmit={handleSubmit}>
      <h2>Add New Product Category</h2>

      <div className="form-group">
        <label htmlFor="pcname">Category Name:</label>
        <input
          type="text"
          id="pcname"
          value={pcatgname}
          onChange={(e) => setPcatgName(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-submit">
        Save
      </button>
    </form>
  );
}

export default NewProductCatg;
