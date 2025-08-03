const express = require("express");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");

adminRouter.post("/login", (req, res, next) => {
  try {
    console.log(req.body);
    
    const adminId = req.body.adminId;
    const adminPass = req.body.adminPass;
    if (
      adminId !== (process.env.ADMIN_ID || "admin") ||
      adminPass !== (process.env.ADMIN_PASS || "abc@123")
    ) {
      res.status(401).send("Invalid  Credentials");
      res.end();
    }
    let token = jwt.sign({ adminId,role:"admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    
    res.status(200).send({token});
  } catch (err) {
    console.log(err);
    
    res.status(500).send("somthing went wrong");
  }
});

module.exports = adminRouter;
