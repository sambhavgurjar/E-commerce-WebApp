const express = require("express");
const cityRouter = express.Router();
var City = require("./city.model");
const adminAuth = require("../middleware/adminAuth.js");

//save city
cityRouter.route("/").post(adminAuth,async function (req, res) {
  try {
    // console.log(req.body);

    const newId = await City.findOne().sort({ ctid: -1 });
    newId ? (req.body.ctid = newId.ctid + 1) : (req.body.ctid = 1);

    // console.log(data);
    var city = new City(req.body);
    await city.save();
    res.status(200).send("City saved");
    res.end();
  } catch (err) {
    console.log(err);

    res.status(500).send(err?.message || "Internal server error");
  }
});

//search city by ctid

cityRouter.route("/search/:ctid").get(async function (req, res) {
  try {
    // console.log(req.params.ctid);

    let city = await City.findOne({ ctid: req.params.ctid })
      .populate("stid")
      .populate("pinid");
    // console.log(city);

    if (!city) {
      res.status(404).send("city not found for this city Id");
    }
    res.status(200).send(city);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});
//search city by pinid

cityRouter.route("/pincode/:pinid").get(async function (req, res) {
  try {
    // console.log(req.params.ctid);
// console.log("check");

    let city = await City.find({ pinid: req.params.pinid }).populate("stid").populate("pinid");
     
    console.log(city);

    if (city?.length===0) {
      return res.status(404).send("city not found for this city Id");
    }
    res.status(200).send(city);
    // res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//update state

cityRouter.route("/:_id").put(adminAuth,async (req, res) => {
  try {
    await City.findByIdAndUpdate(req.params._id,req.body);
    res.status(200).send("city update successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//delete/disable state
cityRouter.route("/:_id").delete(adminAuth,async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params._id);
    res.status(200).send("city deleted successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

// fetch all city
cityRouter.route("/").get(async (req, res) => {
  try {
    let city = await City.find().populate("stid").populate("pinid");
    res.status(200).send(city);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//show all city by _id

cityRouter.route("/citybystate/:_id").get(async (req, res) => {
  try {
    let city = City.find({ status: "enable", _id: req.params._id });
    res.status(200).send(city);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

module.exports = cityRouter;
