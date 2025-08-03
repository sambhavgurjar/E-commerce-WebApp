const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 9191;
const mongoose = require("mongoose");
const config = require("./DB");

//routes
const productCatgRoute = require("./admin/productcatg.route");
const stateRoute = require("./admin/state.route");
const cityRoute=require("./admin/city.route")
const vendorRoute = require("./vendor/vendor.route.js")
const productRoute = require("./product/product.route");
const customerRoute = require("./customer/customer.route");
const paymentRoute = require("./payment.js");
const billsRoute = require("./customer/bills/bills.route.js")
const adminRoute = require("./admin/admin.route.js");
const cartRoute = require("./cart/cart.route.js");
const orderRoute = require("./order/order.route.js");
const pinRoute = require("./admin/pin.route.js");
const emailRoute  = require("./email/email.route.js")

// middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes middleware
app.use("/admin", adminRoute);
app.use("/productcatg", productCatgRoute);
app.use("/state", stateRoute);
app.use("/city", cityRoute);
app.use("/vendor", vendorRoute);
app.use("/product", productRoute);
app.use("/customer", customerRoute);
app.use("/payment", paymentRoute);
app.use("/bill", billsRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/pincode", pinRoute);
app.use("/email", emailRoute);

mongoose.connect(config.URL).then(() => {
  console.log("Database is connected to " + config.URL)
}, err => {
  console.log("can not connect to dataase " + err);
    
});

app.listen(PORT, function () {
    console.log("server is running on Port ",PORT);
    
})