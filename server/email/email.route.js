const SupportEmail = require("./supportEmail.model..js");
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Vendor = require("../vendor/vendor.model.js");
const Customer = require("../customer/customer.model.js");

const sendMails = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NM_EMAIL || "sampleEmail@gmail.com",
      pass: process.env.NM_PASS || "my_pass_key",
    },
  });
  const emailOption = {
    from: process.env.NM_EMAIL,
    to: data?.email,
    subject: data?.subject,
    text: data?.text,
  };
  // console.log(emailOption);

  transporter.sendMail(emailOption, (err, info) => {
    if (err) {
      console.error(err);
      return false;
    } else {
      // console.log(info);
      return true;
    }
  });
};

router.post("/send", async (req, res) => {
  // console.log("check");

  try {
    // console.log(req.body);

    const { email, subject, text } = req.body;
    // console.log("check");

    let isMail = sendMails({ email, subject, text });
    // console.log(isMail);

    if (isMail) {
      res.status(200).send("Mail send successfuly");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/support", async (req, res) => {
  try {
    const { email, subject, text, userId, userRole } = req.body;
    let userName = "Admin";

    let newMail = new SupportEmail(req.body);
    await newMail.save();

    if (userRole === "vendor") {
      let vData = await Vendor.findOne({ _id: userId });
      userName = vData?.VUserName || "Vendor";
    } else if (userRole === "customer") {
      let cData = await Customer.findOne({ _id: userId });
      userName = cData?.CUserName || "Customer";
    }

    let subjectR = "We’ve Received Your Request.";
    let textR = `Dear ${userName},\n\nThank you for reaching out. We've received your request and our team is reviewing it.\n\nWe'll get back to you shortly with a resolution. If we need more details, we’ll contact you.\n\nWe appreciate your patience.\n\nBest regards,\nMyShopSupportTeam\nMyShop.com`;
    let supportMail = { email, subject: subjectR, text: textR };
    let isMail = sendMails(supportMail);
    if (isMail) {
      res.status(200).send("Mail send successfuly");
    } else {
      await SupportEmail.findByIdAndDelete(newMail._id);
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.log(err);
    
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
