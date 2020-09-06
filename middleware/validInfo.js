//validInfo.js
module.exports = function(req, res, next) {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log('validInfo 1 email.length',email.length);
    console.log('validInfo 2 !email.length',!email.length);
    if (![email, name, password].every(Boolean)) {
    console.log('validInfo 3 validEmail.length',validEmail.length);
    console.log('validInfo 4 !validEmail.length',validEmail.length);
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } 
  else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  next();
};
