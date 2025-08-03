const express = require("express");
const vendorRoute = express.Router();
const bodyParser = require("body-parser");
const Vendor = require("./vendor.model.js");
const fs = require("fs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const vendorAuth = require("../middleware/vendorAuth.js");
const path = require("path");

const st = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);

    cb(null, path.join(__dirname, "vendorImages"));
  },
  filename: (req, file, cb) => {
    // console.log(file);

    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: st });

//vendor registration

vendorRoute.post("/register", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.body);
    const {
      VUserId,
      VUserPass,
      VEmail,
      VContact,
      Status,
      VUserName,
      VAddress,
    } = req.body;
    let existingEmail = await Vendor.findOne({ VEmail: req.body.VEmail });
    if (existingEmail) {
      return res.status(400).send("email already exist!");
    }
    let existingUserId = await Vendor.findOne({ VUserId: req.body.VUserId });
    if (existingUserId) {
      return res.status(400).send("User Id already exist!");
    }
    let existingContact = await Vendor.findOne({ VContact: req.body.VContact });
    if (existingContact) {
      return res.status(400).send("Phone no already exist!");
    }
    let newId = await Vendor.findOne().sort({ Vid: -1 });
    newId ? (newId = newId.Vid + 1) : newId=1;
    let VPicName = req?.file?.filename;
    // console.log(req.body);

    var vendor = new Vendor({
      VUserId,
      VUserPass,
      VEmail,
      VContact,
      Status,
      VUserName,
      VAddress,
      Vid: newId,
      VPicName,
    });
    await vendor.save();
    res.status(200).send("registration Successfully");
  } catch (err) {
    console.log(err);

    res.status(500).send(err?.message || "Internal Server Error");
  }
});

//login

vendorRoute.route("/login").post(async (req, res) => {
  try {

    var id = req.body.vuid;
    var pass = req.body.vupass;
    console.log("userid= " + id + " passowrd = " + pass);
    let vendor = await Vendor.findOne({ VUserId: id, VUserPass: pass });
    // console.log(vendor);
    
    if (!vendor) {
   return res.status(401).send("Invalid Vendor Credentials");
    }

    let userData = {
      _id: vendor._id,
      VUserId: vendor.VUserId,
      VUserName: vendor.VUserName,
      VEmail: vendor.VEmail,
      role: "vendor",
      status: vendor.Status,
    };
    let token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.status(200).send({token:token});
    res.end();
  } catch (err) {
    send.status(500).send("Internal Server Error");
  }
});

//get image

vendorRoute.route("/getimage/:vpicname").get((req, res) => {
  res.status(200).sendFile(path.join(__dirname, `vendorImages/${req.params.vpicname}`));
});

//get  all vendor

vendorRoute.route("/").get(async (req, res) => {
  try {
    let vendor = await Vendor.find();
    res.status(200).send(vendor);
    res.end();
  } catch (err) {
    send.status(500).send("Internal Server Error");
  }
});

//update vendor by admin

vendorRoute.route("/:_id").put(async (req, res) => {
  try {
    let vendor = await Vendor.findById(req.params._id);
    if (!vendor) {
      res.status(404).send("vendor nor found for this id");
    }
    await Vendor.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).send("vendor status updated successfully");
    res.end();
  } catch (err) {
    send.status(500).send("Internal Server Error");
  }
});
//get vendor by vendor Id

vendorRoute.route("/:_id").post(async (req, res) => {
  try {
    let vendor = await Vendor.findById(req.params._id);
    if (!vendor) {
      res.status(404).send("vendor not found for this id");
    }
    res.status(200).send(vendor);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

module.exports = vendorRoute;
