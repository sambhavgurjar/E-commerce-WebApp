import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/AdminProduct.css";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [pidSearch, setPidSearch] = useState("");
  const [vidSearch, setVidSearch] = useState("");
console.log("check");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product");
      // console.log(res.data);

      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      let res = await axios.delete(`/product/${_id}`);
      alert(res.data);
      fetchProducts();
    } catch (err) {
      alert(err?.response?.data || "Failed to update status");
      console.error("Failed to delete product:", err);
    }
  };

  const handleStatusUpdate = async (_id, newStatus) => {
    if (!window.confirm("Are you sure you want to update  product status?"))
      return;
    try {
      let res = await axios.put(`/product/${_id}`, { status: newStatus });
      alert(res.data);

      fetchProducts();
    } catch (err) {
      alert(err?.response?.data || "Failed to update status");
      console.error("Failed to update status:", err);
    }
  };

  const filtered = products.filter((prod) => {
    const pidMatch =
      pidSearch === "" || prod.pid.toString().includes(pidSearch);
    const vidMatch =
      vidSearch === "" || prod?.vid?.Vid.toString().includes(vidSearch);
    return pidMatch && vidMatch;
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-product-page">
      <h2>📦 All Products</h2>

      <div className="search-bar-dual">
        <input
          type="text"
          placeholder="Search by PID..."
          value={pidSearch}
          onChange={(e) => setPidSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by VID..."
          value={vidSearch}
          onChange={(e) => setVidSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="admin-product-table">
          <thead>
            <tr>
              <th>PID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Offer Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((prod, idx) => (
              <tr key={idx}>
                <td>{prod.pid}</td>
                <td>
                  <img
                    src={`http://localhost:9191/product/getproductimage/${prod.ppicname}`}
                    alt={prod.pname}
                    className="prod-img"
                  />
                </td>
                <td>{prod.pname}</td>
                <td>{prod?.pcatgid?.pcatgname || "N/A"}</td>
                <td>{prod?.vid?.Vid || "N/A"}</td>
                <td>₹{prod.pprice}</td>
                <td>₹{prod.oprice}</td>
                <td>{prod.status}</td>
                <td>
                  <select
                    value={prod.status}
                    onChange={(e) =>
                      handleStatusUpdate(prod._id, e.target.value)
                    }
                    className="status-dropdown"
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                  {/* <button
                    className="delete-btn"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProduct;
