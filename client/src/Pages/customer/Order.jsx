import React, { useEffect, useState } from "react";
import axios from "../../config/axioxConfig.js";
import "../../css/Order.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState({});
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincodeList, setPincodeList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
console.log("check");

  const navigate = useNavigate();

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth"));
    authData = jwtDecode(authData?.token);
    const selectedItems = JSON.parse(sessionStorage.getItem("orderItem")) || [];

    if (!authData || selectedItems.length === 0) {
      alert("No items selected for order.");
      navigate("/shop/cart");
      return;
    }

    setCustomer(authData);
    setOrderItems(selectedItems);

    axios.get(`/cart/${authData._id}`).then((res) => {
      const filtered = res.data.filter((item) =>
        selectedItems.includes(item.cartid)
      );
      setCartItems(filtered);
    }).catch((err => {
      alert("somthing went wrong to load cart details!");
      console.log(err);;
      
    }))

    axios
      .get("/pincode")
      .then((res) => {
        let pins = res.data.filter((pin) => pin.status === "enable");
        setPincodeList(pins);
      })
      .catch((err) => {
        alert("somthing went wrong to load pincode details!");
        console.log(err);
      });
  }, [navigate]);

  const handlePincodeChange = async (e) => {
    const selectedPinId = e.target.value;
    setPincode(selectedPinId);

    if (selectedPinId) {
      try {
        const res = await axios.get(`/city/pincode/${selectedPinId}`);
        console.log(res.data);  
        let cites = res.data.filter((city) => city.status === "enable");

        setCityList(cites);
        setStateName(res.data[0]?.stid.stname || "");
        setSelectedPincode(res?.data[0]?.pinid?.pincode)
      } catch (err) {
        alert("cant deliver at this pincode please change pincode!");
        console.error(err);
        setStateName("");
      }
    } else {
      setStateName("");
    }
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.qty * item.pid?.oprice,
    0
  );

  const handleConfirmOrder = async () => {
    if (!window.confirm("Confirm Order?")) return;

    if (!selectedPincode ||!selectedCity ||! stateName || !address.trim()) {
      alert("Please  select pincode and fill delivery address");
      return;
    }
    let orderAdd = {
      state: stateName,
      city: selectedCity,
      pincode: selectedPincode,
      address:address
    }
 

    const productList = cartItems.map((item) => ({
      cid: customer._id,
      pid: item.pid._id,
      qty: item.qty,
      vid: item.pid.vid,
      total: item.qty * (item.pid.oprice || item.pid.pprice),
      orderAdd:orderAdd
       
    }));
console.log(productList);

    try {
      for (const item of productList) {
        await axios.post("/order", item);
      }

      alert("🛒 All items ordered successfully!");
      sessionStorage.removeItem("orderItem");
      navigate("/customer/order-list",{replace:true});
    } catch (err) {
      console.error("Order error:", err);
      alert("Order failed: " + err.message);
    }
  };

  return (
    <div className="order-page-container">
      <h2 className="order-page-title">Confirm Your Order</h2>

      <div className="order-page-info">
        <p>
          <strong>Customer:</strong> {customer.CUserId}
        </p>
        <p>
          <strong>Email:</strong> {customer.CEmail}
        </p>

        <div className="order-page-form-group">
          <label>Select Pincode *</label>
          <select value={pincode} onChange={handlePincodeChange} required>
            <option value="">-- Select Pincode --</option>
            {pincodeList.map((pin) => (
              <option key={pin._id} value={pin._id}>
                {pin.pincode}
              </option>
            ))}
          </select>
        </div>

        {pincode && (
          <>
            
            <div className="order-page-form-group">
              <label>State</label>
              <input type="text" value={stateName} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="city">Select City:</label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                required
              >
                <option value="">-- Select City --</option>
                {cityList.map((city) => (
                  <option key={city._id} value={city.ctname}>
                    {city.ctname}
                  </option>
                ))}
              </select>
            </div>
            <div className="order-page-form-group">
              <label>Full Delivery Address *</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full delivery address"
                required
              />
            </div>
          </>
        )}
      </div>

      <table className="order-page-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Product</th>
            <th>Offer Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, idx) => (
            <tr key={idx}>
              <td>
                <img
                  src={`http://localhost:9191/product/getproductimage/${item.pid?.ppicname}`}
                  alt={item.pid?.pname}
                  className="order-page-img"
                />
              </td>
              <td>{item.pid?.pname}</td>
              <td>₹{item.pid?.oprice}</td>
              <td>{item.qty}</td>
              <td>₹{item.qty * item.pid?.oprice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-page-summary">
        <h3>Total: ₹{grandTotal}</h3>
        <button className="order-page-btn-confirm" onClick={handleConfirmOrder}>
          ✅ Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Order;
