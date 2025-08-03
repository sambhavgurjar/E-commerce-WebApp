const express = require("express");
const productcatgRoute = express.Router();
var ProductCatg = require("./productcatg.model");
const adminAuth = require("../middleware/adminAuth.js");


//add new product category
productcatgRoute.route("/").post(adminAuth,async function (req, res) {
  try {
    let newId = await ProductCatg.findOne().sort({ pcatgid: -1 });
    // console.log(newId);
    newId ? newId = newId.pcatgid + 1 : newId = 1;
    var productcatg = new ProductCatg({
      pcatgid: newId,
      pcatgname: req.body.pcatgname,
    });
    // console.log(productcatg);

    await productcatg.save();
    res.status(200).send("product category add successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});


//show all product category

productcatgRoute.route("/").get(async function (req, res) {
  try {
    let pcatg = await ProductCatg.find();
    // console.log(pcatg);

    res.status(200).send(pcatg);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//update product category

productcatgRoute.route("/:_id").put(adminAuth,async (req, res) => {
  try {
    let pcatg = await ProductCatg.findById(req.params._id);
    if (!pcatg) {
      return res.status(404).send("product category not found for this id");
    }
    await ProductCatg.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).send("product category update successfully");
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

//search product category by id


productcatgRoute.route("/search/:pcatgid").get(async (req, res) => {
  try {
      let pcatg = await ProductCatg.findOne({ pcatgid: req.params.pcatgid });
    if (!pcatg) {
      return res.status(404).send("product category not found for this id");
    }
    res.status(200).send(pcatg);
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});
  

//delete product category by _id

productcatgRoute.route("/:_id").delete(adminAuth,async (req, res) => {
  try {
    // console.log("check");
    
    let pcatg = await ProductCatg.findById(req.params._id);
    if (!pcatg) {
      return res.status(404).send("product category not found for this id");
      }
   await ProductCatg.findByIdAndDelete(req.params._id);
      
    res.status(200).send("Product Category Deleted Successfully")   ;
    res.end();
  } catch (err) {
    res.status(500).send(err?.message || "Internal server error");
  }
});

module.exports = productcatgRoute;
