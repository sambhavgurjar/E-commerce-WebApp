import React, { useEffect, useState } from "react";
import axios from "../../config/axioxConfig.js";
import "../../css/BrowseProduct.css";
import coverPic from "../../img/cover1.png"
import { jwtDecode } from "jwt-decode";

function BrowseProduct() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [cData, setCData] = useState("");


  console.log("check");
  

  useEffect(() => {
    let customer = JSON.parse(sessionStorage.getItem("auth"));
    if(customer)customer = jwtDecode(customer?.token);
    setCData(customer);
    fetchProducts();
    fetchCategories();
  }, [setCData]);

  const fetchProducts = () => {
    axios
      .get("/product")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => alert("Error loading products: " + err));
  };

  const fetchCategories = () => {
    axios
      .get("/productcatg")
      .then((res) => setCategories(res.data))
      .catch((err) => alert("Error loading categories: " + err));
  };

  useEffect(() => {
    let result = [...products];
    if (category !== "All") {
      result = result.filter(
        (p) => p?.pcatgid?._id.toString() === category.toString()
      );
    }
    setFiltered(result);
  }, [category, products]);

  useEffect(() => {
    let result = [...products];
    if (searchText.trim() !== "") {
      result = result.filter((p) =>
        p.pname.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFiltered(result);
  }, [searchText, products]);

  const handleAddToCart = (product) => {
    if (product.status === "unavailable") {
      alert("At This Time Product Is Not Available");
      return;
    }

    if (!cData) {
      alert("First login to add to cart any product!");
      return;
    }

    let cartData = {
      cid: cData._id,
      qyt: 1,
      pid: product._id,
    };

    axios
      .post("/cart", cartData)
      .then((res) => alert(res.data))
      .catch((err) => {
        console.log(err);
        alert("error in item adding to cart ")
      });
  };

  return (
    <div className="browse-product-container">
      <div className="browse-header">
        <img
          src={coverPic}
          alt="cover"
          className="browse-cover"
        />
        <h2 className="browse-title">🛒 Browse Products</h2>
      </div>

      <div className="product-controls">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((c, idx) => (
            <option key={idx} value={c._id}>
              {c.pcatgname}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((product, idx) => (
            <div key={idx} className="product-card">
              <img
                src={`http://localhost:9191/product/getproductimage/${product.ppicname}`}
                alt={product.pname}
                className="product-image"
              />
              <div className="product-info">
                <h4>{product.pname}</h4>
                {product.oprice > 0 ? (
                  <>
                    <span style={{ textDecoration: "line-through" }}>
                      ₹{product.pprice}
                    </span>
                    <span> ₹{product.oprice}</span>
                  </>
                ) : (
                  <span>₹{product.pprice}</span>
                )}
                <p className={`status ${product.status.toLowerCase()}`}>
                  {product.status}
                </p>
                <button
                  className="btn-add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default BrowseProduct;
