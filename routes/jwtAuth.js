//jwtauth.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const authorize = require("../middleware/authorize");

//authorizeentication

router.post("/register", validInfo, async  ((req, res)=> {
    const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

  try {
    const user = await (pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]));


    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await (bcrypt.genSalt(10));
    const bcryptPassword = await (bcrypt.hash(password, salt));

    var newUser = await (pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    ));

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
router.post("/login", validInfo, async ((req, res) => {
   const email = req.body.email;
   const password = req.body.password;

  try {
    const user = await (pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]));

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await (bcrypt.compare(
      password,
      user.rows[0].user_password
    ));

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));

router.post("/verify", authorize, (req, res) => {
  try {
    console.log('verify 1'); 
    console.log('verify 2'); 
   res.json(true);
   console.log('verify 3'); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
/*
router.get("/",  authorize, async ((req, res) => {
    try {
    console.log('Entrando 2');   
    return res.json('Entrando 2');
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
*/

module.exports = router;