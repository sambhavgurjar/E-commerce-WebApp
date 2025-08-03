import React from "react";
import { Link } from "react-router-dom";
import "../../css/Register.css";

const Register = () => {
console.log("check");

  return (
    <div className="register-page-container">
      <h2 className="register-title">Select Registration Type</h2>

      <div className="button-group">
        <Link to="/home/register/customer" className="btn-register">
          Customer Registration
        </Link>

        <Link to="/home/register/vendor" className="btn-register">
          Vendor Registration
        </Link>
      </div>
    </div>
  );
};

export default Register;
