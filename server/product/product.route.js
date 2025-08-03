const express = require("express");
const productRoute = express.Router();
var { Product } = require("./product.model");
const multer = require("multer");
const vendorAuth = require("../middleware/vendorAuth.js");
const path = require("path");

const stv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname,"productImage")
    );
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+"_"+file.originalname);
  },
});
const uploadv = multer({ storage: stv });

//add product 
productRoute.route("/").post(uploadv.single("file"),async function (req, res) {
  try {
    // console.log(req.body);
    const { pcatgid,vid,pname,oprice,pprice,status} = req.body;
    let newId = await Product.findOne().sort({ pid: -1 });
    newId ? newId = newId.pid + 1 : newId = 1;
   
    let ppicname = req.file.filename;
    var product = new Product({pcatgid, vid, pname, oprice, pprice, status,pid:newId,ppicname:ppicname});
    await product.save();
    res.status(200).send("product  added successfully");
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

//show all product

productRoute.route("/").get(async (req, res) => {
  try {
    // console.log("check");
    
    let product = await Product.find().populate("vid").populate("pcatgid");
    // console.log(Product);
    // console.log(product);
    

    res.status(200).send(product);
    res.end();
  } catch (err) {
    console.log(err);
    
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

//get product by _id

productRoute.route("/:_id").get(async (req, res) => {
  try {
    let product = await Product.findById(req.params._id);
    // console.log(Product);
    if (!product) {
      res.status(404).send("product not found for this id");
    }

    res.status(200).send(product);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

//image save


//get product image

productRoute.route("/getproductimage/:picname").get((req, res) => {
  res.sendFile(
    "C:/Users/admin/Desktop/major-project-coaching/server/product/productImage/" +
      req.params.picname
  );
});

productRoute.post("/saveproductimage", uploadv.single("file"), (req, res) => {
  res.send("File Uploaded");
  res.end();
});

//get product by vender id

productRoute.route("/vender/:vid").get(async (req, res) => {
  try {
    let product = await Product.find({ vid: req.params.vid });
    res.status(200).send(product);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

//get product by category id
productRoute.route("/pcatg/:pcatgid").get(async (req, res) => {
  try {
    let product = await Product.find({ pcatgid: req.params.pcatgid });
    res.status(200).send(product);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

//update product

productRoute.route("/:_id").put(async (req, res) => {
  try {
    // console.log(req.body);
    let product = await Product.findById(req.params._id);
    if (!product) {
   return res.status(404).send("product not found for this product id!");
      
    }
    await Product.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).send("product  updated successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

//delete product

productRoute.route("/:_id").delete(async (req, res) => {
  try {
    // console.log(req.params_id);
    let product = await Product.findById(req.params._id);
    if (!product) {
      return res.status(404).send("product not found for this product id!");
    }
    await Product.findByIdAndDelete(req.params._id);
    res.status(200).send("product deleted successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

module.exports = productRoute;
