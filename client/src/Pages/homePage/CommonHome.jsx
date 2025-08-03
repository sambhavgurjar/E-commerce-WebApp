import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/CommonHome.css";
import img1 from "../../img/slider_img1.jpg";
import img2 from "../../img/slider_img2.jpg";
import img3 from "../../img/slider_img3.jpg";

const sliderImages = [
  img1,
  img2,
  img3,
];

function CommonHome() {
  const [currentIndex, setCurrentIndex] = useState(0);
console.log("check");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="common-home">
      <section className="slider-section">
        <img
          src={sliderImages[currentIndex]}
          alt="Hero"
          className="slider-image"
        />
        <div className="slider-overlay">
          <h1>Welcome to MyShop.com</h1>
          <p>Your one-stop destination for everything you need</p>
          <div className="slider-buttons">
            <Link to="/home/products" className="btn primary">
              🛒 Start Shopping
            </Link>
            <Link to="/home/login" className="btn secondary">
              🔐 Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Shop with Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span>✅</span>
            <h4>Trusted Vendors</h4>
            <p>Only top-rated and verified sellers.</p>
          </div>
          <div className="feature-card">
            <span>🚚</span>
            <h4>Fast Delivery</h4>
            <p>Lightning-fast, reliable delivery across India.</p>
          </div>
          <div className="feature-card">
            <span>💳</span>
            <h4>Secure Payments</h4>
            <p>Multiple payment options secured with encryption.</p>
          </div>
          <div className="feature-card">
            <span>🌟</span>
            <h4>Customer Satisfaction</h4>
            <p>Top-notch support for a seamless shopping experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CommonHome;
