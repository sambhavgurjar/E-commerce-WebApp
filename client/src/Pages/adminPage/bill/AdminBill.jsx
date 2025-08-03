import React, { useEffect, useState } from "react";
import axios from "../../../config/axioxConfig.js";
import "../../../css/AdminBill.css";

function AdminBill() {
  const [bills, setBills] = useState([]);
console.log("check");

  const fetchBills = async () => {
    try {
      const res = await axios.get("/bill");
      // console.log(res.data);
      console.log(res.data);
      
      setBills(res.data);
    } catch (err) {
      console.error("Failed to fetch bills:", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="admin-bill-page">
      <h2>🧾 All Bills</h2>

      {bills.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        <table className="admin-bill-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Vendor ID</th>
              <th>Total Amount</th>
              <th>Paid</th>
              <th>Order Date</th>
              <th>Pay Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, idx) => (
              <tr key={idx}>
                <td>{bill?.billid || "N/A"}</td>
                <td>{bill?.oid.oid || "N/A"}</td>
                <td>{bill?.cid?.Cid || "N/A"}</td>
                <td>{bill?.vid?.Vid || "N/A"}</td>
                <td>₹{bill?.amount || "N/A"}</td>
                {bill.status === "paid" ? (
                  <td style={{ color: "green" }}> PAID </td>
                ) : (
                  <td style={{ color: "red" }}> UNPAID </td>
                )}
                <td>{bill?.orderDate?.split("T")[0] || "N/A"}</td>
                <td>{bill?.createdAt?.split("T")[0] || "N/A"}</td>
                <td>{bill.razorpayPaymentId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminBill;
