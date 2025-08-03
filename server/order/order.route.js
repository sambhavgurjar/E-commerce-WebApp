const express = require("express");
const Order = require("./order.model.js");
const Bill = require("../customer/bills/bills.model.js");

const router = express.Router();
const customerAuth = require("../middleware/customerAuth.js");

//create new order
router.post("/", customerAuth, async (req, res) => {
  try {
    const { cid, vid, total, qty, pid } = req.body;
    const lastOrder = await Order.findOne().sort({ oid: -1 });
    const newOid = lastOrder ? lastOrder.oid + 1 : 1;
    req.body.oid = newOid;

    const order = new Order(req.body);

    const billData = {
      cid,
      vid,
      oid: order._id,
      billid: Date.now(),
      amount: total,
      status: "unpaid",
    };
    const bill = new Bill(billData);
    order.billid = bill._id;
    let savedOrder = await order.save();
    // console.log(savedOrder);
    bill.orderDate = savedOrder.createdAt;
    await bill.save();

    res.status(201).send("Order successful");
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).send("Failed to create order");
  }
});

//get all order

router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("vid")
      .populate("cid")
      .populate("pid");
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//  Get all orders by customer
router.get("/customer/:_cid", async (req, res) => {
  try {
    const orders = await Order.find({ cid: req.params._cid })
      .populate("pid")
      .sort({
        createdAt: -1,
      });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send("Failed to fetch orders");
  }
});

// Get a order by vendor id(vid)
router.get("/vendor/:_vid", async (req, res) => {
  try {
    const orders = await Order.find({ vid: req.params._vid })
      .populate("vid")
      .populate("cid")
      .populate("pid")
      .sort({
        createdAt: -1,
      });
    res.status(200).send(orders);
  } catch (error) {
    // console.log(error);

    res.status(500).send("Failed to fetch orders");
  }
});
// update order  by oid
router.put("/:_id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).send("order status updated.");
  } catch (error) {
    res.status(500).send("Error fetching order");
  }
});

//Mark order as paid
router.put("/pay/:_id", async (req, res) => {
  // console.log("hello");

  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const order = await Order.findById(req.params._id);
    if (!order) return res.send("Order not found");
    order.paid = "paid";
    await order.save();

    let billDetails = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      status: "paid",
    };
    // console.log(order);

    await Bill.updateOne({ oid: order._id }, billDetails);

    res.send("Payment successful, order updated");
  } catch (err) {
    console.log(err);
    
    res.status(500).send("Failed to update payment status");
  }
});

// Delete an order
router.delete("/_:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params._id);
    res.status(200).send("Order deleted successfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete order", detail: error.message });
  }
});

module.exports = router;
