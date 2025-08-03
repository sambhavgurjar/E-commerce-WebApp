//payment.js                                                                    // npm install razorpay;
// npm install dotenv;

require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    let { total} = req.body;
    // console.log((req.body));
    
    
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "sample_id",
      key_secret: process.env.RAZORPAY_SECRET || "sample secret",
    });
    const options = {
      amount: total*100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

//success page
router.post("/success", async (req, res) => {
  //transaction details
  res.send("Payment Successfully Done");
  res.end();
});
module.exports = router;
