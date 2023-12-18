const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  if (!config.get("requiresAuth")) return next();


  try {
    const token = req.headers.cookie.replace("X-Auth-Token=","");
    if (!token) return res.status(401).send("Access denied. No token provided.");
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

// user (user.balance - )
// product
// name 
// price
// id 
// 

// devices (unique)
// user
// one  To Many 
// expiredDate
//createdDate
// device => request server => auth device (validate expiredDate) => get data 
