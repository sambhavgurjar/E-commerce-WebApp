import React, { useState, useEffect } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/UploadProduct.css";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom"

function UploadProduct() {
  // const [pid, setPId] = useState();
  const [pname, setPName] = useState();
  const [pprice, setPPrice] = useState();
  const [oprice, setOPrice] = useState();
  const [pcatgid, setPCatgId] = useState();
  const [pcatglist, setPCatgList] = useState([]);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [vendorData, setVendorData] = useState("");
  const navigate = useNavigate();
  
  console.log("check");
  useEffect(() => {
    let vData = JSON.parse(sessionStorage.getItem("auth"));
    vData = jwtDecode(vData?.token);
    setVendorData(vData);
  }, []);

  useEffect(() => {
    axios
      .get("/productcatg")
      .then((res) => setPCatgList(res.data))
      .catch((err) => alert(err));
  }, []);
  

  const handleSaveButton = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", image.data);
    formData.append("pname", pname);
    formData.append("oprice", oprice);
    formData.append("pprice", pprice);
    formData.append("vid", vendorData._id);
    formData.append("pcatgid", pcatgid);
    formData.append("status", "available");

   

    axios
      .post("/product", formData, {
        headers: {
          "Content-Type":"multipart/form-data",
        }
      })
      .then(async (res) => {
        alert(res.data || "Product Uploaded Successfully!");
        window.location.reload();
      })
      .catch((err) => {
        alert(err?.response?.data || "Product Upload failed!");
      });
  };

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0],
    };
    setImage(img);
  };

  return (
    <div className="product-container">
      <form className="product-form" onSubmit={handleSaveButton}>
        <h2 className="product-header">Upload Product</h2>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={pname}
            onChange={(e) => setPName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Price</label>
          <input
            type="number"
            value={pprice}
            onChange={(e) => setPPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Offer Price</label>
          <input
            type="number"
            value={oprice}
            onChange={(e) => setOPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input type="file" onChange={handleFileChange} required />
          {image.preview && (
            <img
              src={image.preview}
              alt="preview"
              width="100"
              height="100"
              className="preview-img"
            />
          )}
        </div>

        <div className="form-group">
          <label>Product Category</label>
          <select onChange={(e) => setPCatgId(e.target.value)} required>
            <option value="">Select</option>
            {pcatglist.map((item, idx) => (
              <option key={idx} value={item._id}>
                {item.pcatgname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="product-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadProduct;
