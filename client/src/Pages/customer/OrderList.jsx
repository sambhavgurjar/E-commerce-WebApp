import React, { useEffect, useState } from "react";
import axios from "../../config/axioxConfig";
import "../../css/OrderList.css";
import { jwtDecode } from "jwt-decode";


function OrderList() {
  const [orders, setOrders] = useState([]);
  let customer = JSON.parse(sessionStorage.getItem("auth"));
  customer = jwtDecode(customer?.token);
  const [isPay, setIsPay] = useState(false);
console.log("check");

  useEffect(() => {
    axios
      .get(`/order/customer/${customer._id}`)
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to fetch orders"));
    setIsPay(false);
  }, [isPay]);

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayNow = async (order) => {
    if (!window.confirm(`Pay ₹${order.total} now?`)) return;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) return alert("Razorpay SDK failed to load.");

    const { data } = await axios.post("/payment/orders", {
      total: order.total,
    });

    const options = {
      key: "rzp_test_8CxHBNuMQt1Qn8",
      amount: data.amount.toString(),
      currency: data.currency,
      order_id: data.id,
      name: "MyShop Pvt Ltd",
      handler: async (response) => {
        const paymentDetails = {
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          razorpayPaymentId: response.razorpay_payment_id,
          cid: customer._id,
          billid: Date.now(),
          amount: data.amount / 100,
          oid: order._id,
          vid: order.pid.vid,
          orderDate: order.createdAt,
          status: "paid",
        };

        axios
          .put(`/order/pay/${order._id}`, paymentDetails)
          .then((res) => {
            alert(res.data);
            setIsPay(true);
          })
          .catch(() => alert("Payment failed."));
      },
      prefill: {
        name: customer.CUserId,
        email: customer.CEmail,
        contact: "9244706029",
      },
      theme: { color: "#0d6efd" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="orderlist-page">
      <h2 className="orderlist-heading">🛍️ Your Orders</h2>

      {orders.length === 0 ? (
        <p className="orderlist-empty">You haven't placed any orders yet.</p>
      ) : (
        <div className="orderlist-grid">
          {orders.map((order, idx) => (
            <div key={idx} className="order-card">
              <div className="order-image">
                <img
                  src={`http://localhost:9191/product/getproductimage/${order.pid?.ppicname}`}
                  alt={order.pid?.pname}
                />
              </div>
              <div className="order-details">
                <h3>{order.pid?.pname}</h3>
                <p>
                  <strong>Price:</strong> {`${order.total/order.qty}`}
                </p>
                <p>
                  <strong>Qty:</strong> {order.qty}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.total}
                </p>
                <p>
                  <strong>Address:</strong>
                  {`${order?.orderAdd?.address || "N/A"},${
                    order?.orderAdd?.city || "N/A"
                  },${order?.orderAdd?.pincode || "N/A"},${
                    order?.orderAdd?.state || "N/A"
                  }`}
                </p>
                <p>
                  <strong>Status:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paid === "paid" ? (
                    <span className="paid-badge">✔ Paid</span>
                  ) : (
                    <span className="unpaid-badge">✖ Unpaid</span>
                  )}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {order.createdAt
                    ? order.createdAt.split("T")[0]
                    : "Pending"}
                </p>
                <p>
                  <strong>Delivery:</strong>{" "}
                  {order.deliveryDate
                    ? order.deliveryDate.split("T")[0]
                    : "Pending"}
                </p>

                {order.paid === "unpaid" && (
                  <button
                    className="pay-now-btn"
                    onClick={() => handlePayNow(order)}
                  >
                    💳 Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;
