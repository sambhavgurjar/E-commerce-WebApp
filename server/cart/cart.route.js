const Cart = require("./cart.model");
const express = require("express");
const router = express.Router();
const customerAuth = require("../middleware/customerAuth.js");

//add a item to card
router.post("/", async (req, res) => {
  try {
    let { pid, cid } = req.body;

    let existing = await Cart.findOne({
      pid: pid,
      cid: cid,
    });
    // console.log(existing);
    console.log("check");

    if (existing) {
      return res.status(200).send("product already added in your cart");
    }

    let newId = await Cart.findOne().sort({ cartid: -1 });
    // console.log(newId);

    if (!newId) {
      req.body.cartid = 1;
    } else {
      req.body.cartid = newId.cartid + 1;
    }
    let newCart = new Cart(req.body);
    await newCart.save();
    res.status(200).send("item added sccessfully");
  } catch (err) {
    console.log(err);
    
    res.status(500).send("Internal Server Error");
  }
});

//update cart
router.put("/:_id",async (req, res) => {
  try {

    let cart = await Cart.findById(req.params._id);
    if (!cart) {
      res.status(404).send("cart not found for this id");
    }
    // console.log(cart);

    await Cart.findByIdAndUpdate(req.params._id, req.body);
    // console.log(cart);

    res.status(200).send(`product added successfully`);
  } catch (err) {
    console.log(err);
    
    res.status(500).send("Internal Server Error");
  }
});

//get cart by cid

router.get("/:_cid", customerAuth,async (req, res) => {
  try {
    let cart = await Cart.find({ cid: req.params._cid }).populate("pid");

    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

//remove single cart by cid
router.delete("/:_cid/:_id", customerAuth,async (req, res) => {
  try {
    let { _cid, _id } = req.params;
    // console.log(_cid, _id);
    let cart = await Cart.findById(req.params._id);
    if (!cart) {
      res.status(404).send("cart not found for this id");
    }

    let carts = await Cart.deleteOne({
      cid: _cid,
      _id: _id,
    });
    res.status(200).send("cart removed successfully .");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
