import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig";
import "../../../css/AllProductCatg.css"; // Scoped CSS

function AllProductCatg() {
  const [categories, setCategories] = useState([]);
  console.log("check");

  useEffect(() => {
    axios
      .get("/productcatg") 
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        alert(err?.response?.data || "Error fetching product categories:");
      });
  }, []);

  return (
    <div className="all-catg-container">
      <h2>All Product Categories</h2>

      {categories.length > 0 ? (
        <table className="all-catg-table">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category Name</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {categories.map((catg, idx) => (
              <tr key={idx}>
                <td>{catg.pcatgid}</td>
                <td>{catg.pcatgname}</td>
                {/* <td>{catg.status}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="all-catg-loading">Product Category Not Listed...!</p>
      )}
    </div>
  );
}

export default AllProductCatg;
