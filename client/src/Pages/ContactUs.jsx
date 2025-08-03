import React, { useState, useEffect } from "react";
import "../css/ContactUs.css";
import axios from "../config/axioxConfig.js";
import { jwtDecode } from "jwt-decode";
function Contact() {
  const [user, setUser] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const resetFrom = () => {
    setSubject("");
    setEmail("");
    setText("");
 }
  console.log("check");

  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("auth"));
    if (userData) {
      userData = jwtDecode(userData?.token);
      setUser(userData);
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("first login for contact us!");
      return;
    }
    let userId = user?._id ? user?._id : null;
    let data = { email, subject, text,userRole:user.role ,userId};
 
    axios.post("/email/support",data).then((res) => {
      // alert(res?.data);
      console.log(res.data);
      alert("Thanks for contacting us! We'll get back to you soon.");
      resetFrom();
    }).catch((err) => {
       console.error(err);
      //  alert(err?.response?.data || "failed to send email!");
       
     })
    
  };

  return (
    <div className="contact-container">
      <h1>📬 Contact Us</h1>
      <p>
        We'd love to hear from you! Please fill out the form below and our team
        will respond as soon as possible.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email*"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Subject*"
          required
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <textarea
          placeholder="Your Message*"
          rows="5"
          required
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
