const express = require("express");
const router = express.Router();
const Pincode = require("./pin.model.js");
const adminAuth = require("../middleware/adminAuth.js");

//add a new pincode
router.post("/", adminAuth,async (req, res) => {
    try {
        // console.log(req.body);
        
      
    const existingPin = await Pincode.findOne({ pincode: req.body.pincode });
    if (existingPin) {
      res.status(400).send(`Pincode  already exist.`);
        }
        const newid = await Pincode.findOne().sort({ pinid: -1 });
        newid ? req.body.pinid = newid.pinid + 1 : req.body.pinid = 1;
    const newPin = new Pincode(req.body);
    const savedPin = await newPin.save();
    res.status(200).send(`Pincode  saved successfully.`);
  } catch (err) {
      console.log(err);
      
    res.status(500).send("Failed to saved pincode.");
  }
});

//  Get all pincode
router.get("/", async (req, res) => {
  try {
    const pins = await Pincode.find();
    res.status(200).send(pins);
  } catch (err) {
    res.status(500).send("Error to fetch pincodes.");
  }
});

//  Get a single pincode by pinid
router.get("/pinid/:id", async (req, res) => {
  try {
      const pin = await Pincode.findOne({ pinid: req.params.id });
    if (!pin) return res.status(404).send("Pincode not found for this Id.");
    res.status(200).send(pin);
  } catch (err) {
    res.status(500).send("Invalid ID or search error.");
  }
});
//  Get a single pincode by ID
router.get("/search/:id", async (req, res) => {
  try {
    const pin = await Pincode.findById(req.params.id);
    if (!pin) return res.status(404).send("Pincode not found for this Id.");
    res.status(200).send(pin);
  } catch (err) {
    res.status(500).send("Invalid ID or search error.");
  }
});

// Update a pincode by ID
router.put("/:id", adminAuth,async (req, res) => {
  try {
    const { pinname, status } = req.body;
    const updatedPin = await Pincode.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Pincode updated successfully.");
  } catch (err) {
    res.status(500).send("Update failed.");
  }
});

// Delete a pincode by ID
router.delete("/:id", adminAuth,async (req, res) => {
  try {
    const deletedPin = await Pincode.findByIdAndDelete(req.params.id);
    if (!deletedPin) return res.status(404).send("Pincode not found.");
    res.status(200).send("Pincode deleted successfully.");
  } catch (err) {
    res.status(500).send("Delete failed.");
  }
});

module.exports = router;
