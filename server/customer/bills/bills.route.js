const express = require("express");
const billsRoute = express.Router();
let Bill = require("./bills.model");
const customerAuth = require("../../middleware/customerAuth.js");

//save payment details
billsRoute.route("/bill").post(customerAuth,(req, res) => {
  let bills = new Bill(req.body);
  // console.log(bills);

  bills
    .save()
    .then((bill) => {
      res.send("payment details saved successfully");
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});
//get all bills
billsRoute.route("/").get(async (req, res) => {
  try {
    let bills = await Bill.find().populate("cid").populate("oid").populate("vid");
    console.log(bills);
    
    res.status(200).send(bills);
  } catch (err) {
    res.status(500).send("Internal Server Error")
  }
});
//get bill by customer id
billsRoute.route("/customer/:_id").get(async (req, res) => {
  try {
    let bills = await Bill.find({cid:req.params._id}).populate("cid").populate("oid").populate("vid");
    res.status(200).send(bills);
  } catch (err) {
    res.status(500).send("Internal Server Error")
  }
});
//get bill by vendor id
billsRoute.route("/vendor/:_id").get(async (req, res) => {
  try {
    let bills = await Bill.find({vid:req.params._id}).populate("cid").populate("oid").populate("vid");
    res.status(200).send(bills);
  } catch (err) {
    res.status(500).send("Internal Server Error")
  }
});

//get payment details by  bill id
billsRoute.route("/showbillsbyid/:billid").get((req, res) => {
  Bill.findOne({ billid: req.params.billid })
    .then((pd) => {
      res.send(pd);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

module.exports = billsRoute;
