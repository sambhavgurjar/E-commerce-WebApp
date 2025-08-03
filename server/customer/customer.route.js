const express = require("express");
const customerRoute = express.Router();
const Customer = require("./customer.model");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");

const st = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);

    cb(null, path.join(__dirname, "customerImages"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: st });



//customer registration code

customerRoute.post("/register", upload.single("file"), async (req, res) => {
  const {
    CUserId,
    CUserPass,
    CEmail,
    CContact,
    Status,
    CUserName,
    CAddress,
  } = req.body;
  
  try {
    let existingEmail = await Customer.findOne({ CEmail: CEmail });
    if (existingEmail) {
      return res.status(400).send("email already exist!");
    }
    let existingUserId = await Customer.findOne({ CUserId: CUserId });
    if (existingUserId) {
      return res.status(400).send("User Id already exist!");
    }
    let existingContact = await Customer.findOne({
      CContact: CContact,
    });
    if (existingContact) {
      return res.status(400).send("Phone no already exist!");
    }

    let newId = await Customer.findOne().sort({ Cid: -1 });
    newId ? (newId = newId.Cid + 1) :newId= 1;
    let CPicName = req?.file?.filename;
    // console.log(req.file);
    
    var customer = new Customer({
      Cid: newId,
      CUserId,
      CUserPass,
      CEmail,
      CContact,
      Status,
      CUserName,
      CAddress,
      CPicName,
    });
    await customer.save();
    res.status(200).send("Registration Successfully");
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal Server Error!");
  }
});

//login code

customerRoute.route("/login").post(async (req, res) => {
  try {
    var id = req.body.CUserId;
    var pass = req.body.CUserPass;
    // console.log(id, pass);

    let customer = await Customer.findOne({
      CUserId: id,
      CUserPass: pass,
    });
    if (!customer) {
      res.status(401).send("Invalid Customer Credentials");
    }
    // console.log(customer);

    let userData = {
      _id: customer._id,
      CUserId: customer.CUserId,
      CustomerName: customer.CustomerName,
      CEmail: customer.CEmail,
      role: "customer",
      Status: customer.Status,
    };
    // console.log(userData);

    let token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log(token);

    // userData.token = token;
    res.send({token});
    res.end();
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
});

//get image

customerRoute.route("/getimage/:cpicname").get((req, res) => {
  res.status(200).sendFile(path.join(__dirname, `customerImages/${req.params.cpicname}`));
});



//get all customer

customerRoute.route("/").get(async (req, res) => {
  try {
    let customers = await Customer.find();

    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send("Internal Server Error!");
  }
});

//get customer list

//update customer

customerRoute.route("/:_id").put(async (req, res) => {
  try {
    let customer = await Customer.findById(req.params._id);
    if (!customer) {
      res.status(404).send("Customer not found for this id!");
    }
    await Customer.findByIdAndUpdate(req.params._id, req.body);

    res.status(200).send("customer updated successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error!");
  }
});
//get customer by CUserId

customerRoute.route("/:_id").post(async (req, res) => {
  try {
    let customer = await Customer.findById(req.params._id);
    if (!customer) {
      res.status(404).send("Customer not found for this id!");
    }
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = customerRoute;
