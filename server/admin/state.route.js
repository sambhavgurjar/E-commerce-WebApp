const express = require("express");
const stateRoute = express.Router();
var State = require("./state.model");
const adminAuth = require("../middleware/adminAuth.js");

//save
stateRoute.route("/").post(adminAuth,async function (req, res) {
  try {
    const newId = await State.findOne().sort({ stid: -1 });
    // console.log("id --",stid);
    newId ? newId = newId.stid + 1 : newId = 1;

    let data = { stid: newId, ...req.body };
    console.log(data);

    var state = new State(data);

    await state.save();
    res.status(200).send("state saved successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//search state y stid

stateRoute.route("/search/:stid").get(async function (req, res) {
  try {
    let state = await State.findOne({ stid: req.params.stid });
    if (!state) {
      res.status(404).send("state not found for this state Id");
    }
    res.send(state);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//update state by _id

stateRoute.route("/:_id").put(adminAuth,async (req, res) => {
  try {
    await State.findByIdAndUpdate(req.params._id, {
      stname: req.body.stname,
      status: req.body.status,
    });

    res.send("state update successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//delete state by _id
stateRoute.route("/:_id").delete(adminAuth,async (req, res) => {
  try {
    await State.findByIdAndDelete(req.params._id);
    res.send("status deleted successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//show enable state

stateRoute.route("/enable").get(adminAuth,async (req, res) => {
  try {
    let state = await State.find({ status: "enable" });
    res.send(state);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//show all

stateRoute.route("/").get(async (req, res) => {
  try {
    let state = await State.find();
    res.send(state);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

module.exports = stateRoute;
