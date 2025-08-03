const jwt = require("jsonwebtoken");

const customerAuth = (req, res, next) => {
  try {
    // console.log(req.headers);

    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send("No token provided");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET || "my_jwt_secret");
    // console.log(decode);

    req.user = decode;
    if (decode.role !== "customer") {
      return res.status(403).send("Not Authorize for customer page !");
    }
    next();
  } catch (err) {
    res.status(500).send("Invalid Token Or Token Expired");
    res.end();
  }
};
module.exports = customerAuth;
