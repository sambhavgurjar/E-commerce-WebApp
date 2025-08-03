import React, { useEffect, useState } from "react";
import axios from "../../config/axioxConfig.js";
import "../../css/VendorOrder.css";
import { jwtDecode } from "jwt-decode";


function VendorOrder() {
  const [orders, setOrders] = useState([]);
  const [vData, setVData] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchOid, setSearchOid] = useState("");
  console.log("check");
  
  const fetchOrders = async (_id) => {
    try {
      const res = await axios.get(`/order/vendor/${_id}`);
      // console.log(res.data);
      
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load vendor orders", err);
    }
  };

  useEffect(() => {
    let vendor = JSON.parse(sessionStorage.getItem("auth"));
    vendor = jwtDecode(vendor?.token);
    if (vendor?._id) {
      setVData(vendor);
      fetchOrders(vendor._id);
    }
  }, []);

  useEffect(() => {
    const initData = {};
    orders.forEach((order) => {
      initData[order.oid] = {
        orderStatus: order.orderStatus,
        deliveryDate: order.deliveryDate
          ? order.deliveryDate.split("T")[0]
          : "",
      };
    });
    setFormData(initData);
  }, [orders]);

  const handleInputChange = (oid, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [oid]: {
        ...prev[oid],
        [field]: value,
      },
    }));
  };

  const updateOrder = async (order) => {
    const { orderStatus, deliveryDate } = formData[order.oid];
    try {
      const confirm = window.confirm("Update order status and delivery date?");
      if (!confirm) return;

      await axios.put(`/order/${order._id}`, {
        orderStatus,
        deliveryDate,
      });

      alert("Order updated successfully");
      if (vData?.Vid) fetchOrders(vData.Vid);
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const filteredOrders = searchOid
    ? orders.filter((order) => order.oid.toString().includes(searchOid.trim()))
    : orders;

  return (
    <div className="vendor-orders">
      <h2>🧾 Vendor Orders</h2>

     
      <div className="vendor-order-search-box">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchOid}
          onChange={(e) => setSearchOid(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.oid}>
                <td>{order.oid}</td>
                <td>{order.cid.Cid}</td>
                <td>{order.pid?.pid}</td>
                <td>{order.pid?.pname}</td>
                <td>{order?.qty}</td>
                <td>₹{order.total}</td>
                <td>{order.paid ? "Paid" : "Not Paid"}</td>
                <td>
                  <input
                    type="date"
                    value={formData[order.oid]?.deliveryDate || ""}
                    onChange={(e) =>
                      handleInputChange(
                        order.oid,
                        "deliveryDate",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <select
                    value={formData[order.oid]?.orderStatus}
                    onChange={(e) =>
                      handleInputChange(
                        order.oid,
                        "orderStatus",
                        e.target.value
                      )
                    }
                  >
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => updateOrder(order)}>
                    Update Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VendorOrder;
