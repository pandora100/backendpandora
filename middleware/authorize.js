//authorize.js
const jwt = require("jsonwebtoken");
//require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  console.log('authorize 1 token:',token); 
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token,'cat123');
     console.log('authorize 2 verify:', verify);
     console.log('authorize 3 verify.user:', verify.user);
    req.user = verify.user;
    console.log('authorize 4 req.user:', req.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
     console.log('authorize 5 err:', err);
  }
};
