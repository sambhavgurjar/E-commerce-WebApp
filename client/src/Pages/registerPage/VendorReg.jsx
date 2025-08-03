import React, { useEffect, useState } from "react";
import axios from "../../config/axioxConfig";
import "../../css/VendorReg.css";

function VenderReg() {
  const [vUserId, setVUserId] = useState("");
  const [vUserPass, setVUserPass] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vAddress, setVAddress] = useState("");
  const [vContact, setVContact] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });

  console.log("check");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage({
      preview: URL.createObjectURL(file),
      data: file,
    });

  };


  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !image.data
    ) {
      alert("Please  upload a photo.");
      return;
    }

    let formData = new FormData();
    formData.append("VUserId",vUserId)
    formData.append("VUserName",vendorName)
    formData.append("VUserPass",vUserPass)
    formData.append("VEmail",vEmail)
    formData.append("VContact",vContact)
    formData.append("VAddress",vAddress)
    formData.append("file",image.data)
   

    axios
      .post("http://localhost:9191/vendor/register", formData, {
        headers: {
          "Content-Type":"multipart/form-data",
        }
      })
      .then((res) => {
        alert(res.data);
        let email = vEmail;
        let subject = "Vendor Registration Received – Pending Admin Approval";
        let text = `Dear ${vendorName},\n
Thank you for registering as a vendor with MyShop.\nYour registration was successful, but your account is currently inactive.\nOur admin team is reviewing your information. Once approved, your vendor account will be activated and you will receive a confirmation email.\nIf any additional information is required, we’ll reach out to you directly.\nWe appreciate your interest in partnering with MyShop.\nBest regards,\nMyShop Vendor Management Team\nwww.myshop.com`;
        axios
          .post("/email/send/", { email, subject, text })
          .then((resp) => {
            console.log(resp.data);

            alert(resp?.data);
            resetForm();
          })
          .catch((err) => {
            console.error(err);

            // alert(err?.response?.data || "Error registering vednor ")
          });
      })
      .catch((err) => alert(err?.response?.data));
  };

  const resetForm = () => {
    setVUserId("");
    setVUserPass("");
    setVendorName("");
    setVAddress("");
    setVContact("");
    setVEmail("");
    setImage({ preview: "", data: "" });
  };

  return (
    <div className="vender-register-page">
      <h2>Vendor Registration</h2>

      <form onSubmit={handleRegister} className="vender-register-form">
        <div className="form-group">
          <label>Vendor User ID *</label>
          <input
            type="text"
            value={vUserId}
            onChange={(e) => setVUserId(e.target.value)}
            required
            minLength={4}
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            value={vUserPass}
            onChange={(e) => setVUserPass(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label>Vendor Name *</label>
          <input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
            minLength={4}
          />
        </div>

        <div className="form-group">
          <label>Address *</label>
          <input
            type="text"
            value={vAddress}
            onChange={(e) => setVAddress(e.target.value)}
            required
            minLength={4}
          />
        </div>

        <div className="form-group">
          <label>Contact *</label>
          <input
            type="number"
            min="6000000000"
            max="9999999999"
            value={vContact}
            onChange={(e) => setVContact(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={vEmail}
            onChange={(e) => setVEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Photo *</label>
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

export default VenderReg;
