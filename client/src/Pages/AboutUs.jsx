import React from "react";
import "../css/AboutUs.css";

function AboutUs() {
  console.log("check");

  return (
    <div className="about-container">
      <h1>About 🛒 MyShop</h1>
      <p>
        Welcome to <strong>MyShop</strong>, your trusted destination for quality
        products and hassle-free online shopping. We are committed to providing
        you with a seamless and personalized shopping experience.
      </p>

      <h2>📦 What We Offer</h2>
      <ul>
        <li>
          Wide range of categories including electronics, fashion, and home
          essentials
        </li>
        <li>Verified vendors and top-rated customer service</li>
        <li>Fast delivery and reliable order tracking</li>
        <li>Secure payments and easy returns</li>
      </ul>

      <h2>👨‍💼 Our Mission</h2>
      <p>
        Our mission is to empower local vendors and deliver high-quality
        products directly to your door. With transparent pricing and
        customer-first service, we aim to redefine convenience and trust in
        online shopping.
      </p>

      <h2>📞 Contact Us</h2>
      <p>
        Need help? Reach out at 
        <a href="mailto:support@myshop.com" >support@myshop.com</a>
      </p>
    </div>
  );
}

export default AboutUs;
