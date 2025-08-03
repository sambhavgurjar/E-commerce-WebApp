import React, { useState, useEffect } from "react";
import axios from "../../config/axioxConfig.js";
import "../../css/CustomerReg.css";

function CustomerReg() {
  const [cUserId, setCUserId] = useState("");
  const [cUserPass, setCUserPass] = useState("");
  const [cUserName, setCUserName] = useState("");
  const [cAddress, setCAddress] = useState("");
  const [cContact, setCContact] = useState("");
  const [cEmail, setCEmail] = useState("");
  // const [cPicName, setCPicName] = useState("");
  const [status, setStatus] = useState("Inactive");

  const [image, setImage] = useState({ preview: "", data: "" });

  console.log("check");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setImage({
      preview: URL.createObjectURL(file),
      data: file,
    });
    // setCPicName(file.name);
  };

 

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!image.data) {
      alert("Please upload a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image.data);
    formData.append("CUserId", cUserId);
    formData.append("CUserPass", cUserPass);
    formData.append("CUserName", cUserName);
    formData.append("CAddress", cAddress);
    formData.append("CContact", cContact);
    formData.append("CEmail", cEmail);
    formData.append("Status", "active");

 

    axios
      .post("/customer/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert(res?.data || "customer registration successfull");
        let email = cEmail;
        let subject = "Welcome to MyShop – Your Registration Was Successful!";
        let text = `Dear ${cUserName},\nThank you for registering with MyShop. We're excited to have you on board!\nYou can now explore our products, manage your orders, and enjoy a seamless shopping experience with us.\nIf you have any questions or need assistance, feel free to contact our support team through our website.\nWelcome once again!\nBest regards,\nMyShop Team\nwww.myshop.com`;
        axios
          .post("/email/send/", { email, subject, text })
          .then((resp) => {
            console.log(resp.data);

            alert(resp?.data);
            resetForm();
          })
          .catch((err) => {
            console.error(err);

            // alert(err?.response?.data || "Error registering customer ")
          });
      })
      .catch((errs) => {
        console.log(errs);

        alert(errs?.response?.data || "Error registering customer ");
      });
  };

  const resetForm = () => {
    setCUserId("");
    setCUserPass("");
    setCUserName("");
    setCAddress("");
    setCContact("");
    setCEmail("");
    // setCPicName("");
    setImage({ preview: "", data: "" });
    setStatus("active");
  };

  return (
    <div className="customer-register-page">
      <h2>Customer Registration</h2>

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>User ID *</label>
          <input
            value={cUserId}
            onChange={(e) => setCUserId(e.target.value)}
            type="text"
            required
            minLength={4}
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            value={cUserPass}
            onChange={(e) => setCUserPass(e.target.value)}
            type="password"
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label>Customer Name *</label>
          <input
            minLength={4}
            value={cUserName}
            onChange={(e) => setCUserName(e.target.value)}
            type="text"
            required
          />
        </div>

        <div className="form-group">
          <label>Address *</label>
          <input
            value={cAddress}
            onChange={(e) => setCAddress(e.target.value)}
            type="text"
            required
            minLength={4}
          />
        </div>

        <div className="form-group">
          <label>Contact *</label>
          <input
            value={cContact}
            min="6000000000"
            max="9999999999"
            onChange={(e) => setCContact(e.target.value)}
            type="number"
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            value={cEmail}
            onChange={(e) => setCEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Photo *</label>
          <input type="file" onChange={handleFileChange} required />
          {image.preview && (
            <img src={image.preview} alt="Preview" width="100" />
          )}
        </div>

        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerReg;
