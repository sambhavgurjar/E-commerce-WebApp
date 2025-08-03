const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    

if (!token) {
  return res.status(401).send("No token provided");
}
    const decode = jwt.verify(token, process.env.JWT_SECRET || "my_jwt_secret");
      req.user = decode;
      if (decode.role !== "admin") {
        return res.status(403).send("Not Authorize for admin page !");
        
    }  
    next();
  } catch (err) {
    res.status(500).send("Invalid Token Or Token Expired");
    res.end();
  }
};
module.exports = adminAuth;
