import React, { useEffect, useState, useCallback } from "react";
import axios from "../../config/axioxConfig.js";
import "../../css/Cart.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cData, setCData] = useState(null);
  const [checked, setChecked] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
console.log("check");

  const navigate = useNavigate();

  useEffect(() => {
    let customer = JSON.parse(sessionStorage.getItem("auth"));
   customer = jwtDecode(customer?.token)
    setCData(customer);
    const storedItems = JSON.parse(sessionStorage.getItem("orderItem")) || [];
    setOrderItems(storedItems);
  }, []);

  function checkBtn() {
    setChecked((pre) => !pre);
  }

  const fetchCart = useCallback(() => {
    axios
      .get(`/cart/${cData._id}`)
      .then((res) => setCartItems(res.data))
      .catch((err) => alert("Error fetching cart: " + err));
  }, [cData]);

  useEffect(() => {
    if (cData) fetchCart();
  }, [cData, fetchCart]);

  const increaseQty = (_id, qty) => {
    if (!_id) return;
    axios
      .put(`/cart/${_id}`, { qty: qty + 1 })
      .then(() => fetchCart())
      .catch((err) => alert("Error increasing quantity"));
  };

  const decreaseQty = (_id, qty) => {
    if (qty <= 1) return;
    axios
      .put(`/cart/${_id}`,{qty:qty-1})
      .then(() => fetchCart())
      .catch((err) => alert("Error decreasing quantity"));
  };

  const removeFromCart = (_id) => {
    axios
      .delete(`/cart/${cData._id}/${_id}`)
      .then(() => {
        alert("Item removed from cart");
        fetchCart();
      })
      .catch((err) => alert("Error removing item: " + err));
  };

  const handleCheckboxChange = (evt, cartid) => {
    checkBtn();
    let updatedItems = [...orderItems];

    if (evt.target.checked) {
      if (!updatedItems.includes(cartid)) {
        updatedItems.push(cartid);
      }
    } else {
      updatedItems = updatedItems.filter((item) => item !== cartid);
    }

    setOrderItems(updatedItems);
    if (updatedItems.length > 0) {
      sessionStorage.setItem("orderItem", JSON.stringify(updatedItems));
    } else {
      sessionStorage.removeItem("orderItem");
    }
  };

  const handleOrder = () => {
    // alert("Order placed for: " + orderItems.join(", "));
    // sessionStorage.removeItem("orderItem");
    // setOrderItems([]);

    if (orderItems.length > 0) {
      navigate("/customer/order");
    }
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {cartItems.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Photo</th>
                <th>Product</th>
                <th>Price</th>
                <th>Offer Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      checked={orderItems.includes(item.cartid)}
                      onChange={(e) => handleCheckboxChange(e, item.cartid)}
                    />
                  </td>
                  <td>
                    <img
                      src={`http://localhost:9191/product/getproductimage/${item.pid?.ppicname}`}
                      alt={item.product?.pname}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.pid?.pname}</td>
                  <td>₹{item.pid?.pprice}</td>
                  <td>₹{item.pid?.oprice}</td>
                  <td>
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(item._id, item.qty)}
                    >
                      -
                    </button>
                    <span className="qty-display">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseQty(item._id, item.qty)}
                    >
                      +
                    </button>
                  </td>
                  <td>₹{item.qty * item.pid?.oprice}</td>
                  <td>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item._id)}
                    >
                      🗑 Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-actions">
            <button
              className="btn-order"
              disabled={orderItems.length === 0}
              onClick={handleOrder}
            >
              🛒 Place Order ({orderItems.length})
            </button>
          </div>
        </>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
}

export default Cart;
