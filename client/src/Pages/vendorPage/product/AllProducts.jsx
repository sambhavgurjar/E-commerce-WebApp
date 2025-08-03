import React, { useState, useEffect } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/AllProduct.css";
import { jwtDecode } from "jwt-decode";

function AllProduct() {
  const [pcatglist, setPCatgList] = useState([]);
  const [plist, setPList] = useState([]);
  const [filteredCatg, setFilteredCatg] = useState("all");
  const [searchPid, setSearchPid] = useState("");

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log("check");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let vData = JSON.parse(sessionStorage.getItem("auth"));
    vData = jwtDecode(vData?.token);
    axios
      .get("/productcatg/")
      .then((res) => setPCatgList(res.data))
      .catch((err) =>
        alert(err?.response?.data || "Failed to fetch product categories")
      );

    axios
      .get(`/product/vender/${vData._id}`)
      .then((res) => setPList(res.data))
      .catch((err) =>
        alert(err?.response?.data || "Failed to fetch product data")
      );
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct({ ...product });
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`/product/${selectedProduct._id}`, {
        pname: selectedProduct.pname,
        pprice: selectedProduct.pprice,
        oprice: selectedProduct.oprice,
        status: selectedProduct.status,
      });
      alert(res.data || "Product updated successfully");
      setShowUpdateForm(false);
      fetchData();
    } catch (err) {
      alert(err?.response?.data || "Updation failed");
    }
  };

  const filteredProducts = plist
    .filter(
      (p) =>
        filteredCatg === "all" ||
        p.pcatgid.toString() === filteredCatg.toString()
    )
    .filter((p) =>
      searchPid.trim() === ""
        ? true
        : p.pid.toString().includes(searchPid.trim())
    );

  return (
    <div className="allproduct-container">
      <center>
        <p className="allproduct-header">Product List</p>

        {showUpdateForm && selectedProduct && (
          <div className="allproduct-popup-overlay">
            <div className="allproduct-popup-wrapper">
              <h3>Update Product {selectedProduct.pid}</h3>
              <form onSubmit={handleUpdateSubmit}>
                <input
                  type="text"
                  value={selectedProduct.pname}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      pname: e.target.value,
                    })
                  }
                  placeholder="Product Name"
                  required
                />
                <input
                  type="number"
                  value={selectedProduct.pprice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      pprice: e.target.value,
                    })
                  }
                  placeholder="Price"
                  required
                />
                <input
                  type="number"
                  value={selectedProduct.oprice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      oprice: e.target.value,
                    })
                  }
                  placeholder="Offer Price"
                />
                <select
                  value={selectedProduct.status}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                <div className="allproduct-popup-buttons">
                  <button type="submit">✅ Save</button>
                  <button
                    type="button"
                    onClick={() => setShowUpdateForm(false)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {plist.length === 0 && <p>Product not listed or failed to fetch.</p>}

        {plist.length > 0 && (
          <>
            <div className="allproduct-filter">
              <label htmlFor="categoryFilter">
                <strong>Filter by Category:</strong>
              </label>{" "}
              <select
                id="categoryFilter"
                value={filteredCatg}
                onChange={(e) => setFilteredCatg(e.target.value)}
              >
                <option value="all">All</option>
                {pcatglist.map((catg, idx) => (
                  <option key={idx} value={catg._id}>
                    {catg.pcatgname}
                  </option>
                ))}
              </select>
            </div>

            <div className="allproduct-search">
              <label htmlFor="searchPid">
                <strong>Search by Product ID:</strong>
              </label>{" "}
              <input
                type="text"
                id="searchPid"
                placeholder="Enter Product Id"
                value={searchPid}
                onChange={(e) => setSearchPid(e.target.value)}
              />
            </div>

            <table className="allproduct-table" border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Offer Price</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.pid}</td>
                      <td>{item.pname}</td>
                      <td>{item.pprice}</td>
                      <td>{item.oprice}</td>
                      <td>
                        {pcatglist.find((c) => c._id === item.pcatgid)
                          ?.pcatgname || "Other"}
                      </td>
                      <td>{item.status}</td>
                      <td>
                        <img
                          src={`http://localhost:9191/product/getproductimage/${item.ppicname}`}
                          alt="Product"
                          width="100"
                          height="100"
                        />
                      </td>
                      <td>
                        <button onClick={() => handleUpdateClick(item)}>
                          ✏️ Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">
                      No products found for selected category or ID.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </center>
    </div>
  );
}

export default AllProduct;
