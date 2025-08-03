const jwt = require("jsonwebtoken");

const vendorAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send("No token provided");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET || "my_jwt_secret");
    req.user = decode;
    // console.log(decode);
    
    if (decode.role !== "vendor") {
      return res.status(403).send("Not Authorize for vendor page !");
    }
    next();
  } catch (err) {
    res.status(500).send("Invalid Token Or Token Expired");
  }
};
module.exports = vendorAuth; 
