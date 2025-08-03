import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/Footer.css";
import { jwtDecode } from "jwt-decode";

function Footer() {
  const [route, setRoute] = useState("");
  useEffect(() => {
    let uData = JSON.parse(sessionStorage.getItem("auth"));
    if (uData) uData = jwtDecode(uData?.token);
    // console.log(uData);
    if (uData) {
   
      let rt = `/${uData.role}/`;
      setRoute(rt);
    } else {
      setRoute("/home/");
    }
    // console.log(route);
  }, [route]);

  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>
          MyShop<span>.com</span>
        </h3>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>

      <div className="footer-links">
        <Link to={`${route}about`}>AboutUs</Link>
        <Link to={`${route}contact`}>contact</Link>
      </div>

      <div className="footer-right">
        <p>Follow Us:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
