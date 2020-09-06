const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
var async = require('asyncawait/async');
var await = require('asyncawait/await');

router.post("/register",validInfo,  (req, res) => {
   
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ],  (err, result) => {
    if (err) {
    return console.error('Error executing query', err.stack);
             }
    console.log('register result.rows:', result.rows);
    if (result.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }


     var bcryptPassword='';
     bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                         if (err) {
                         return console.error('Error executing query', err.stack);
                          }
	
                        bcryptPassword = hash; 
                        //insertar registro
					    var newUser = pool.query(
					      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
					      [name, email,  bcryptPassword]
					    ,  (err) => {
					    if (err) {
					    return console.error('Error executing query', err.stack);
					             }
                                  //const jwtToken = jwtGenerator(result.rows[0].user_id);
                                  const jwtToken = jwtGenerator(result.rows[0]);
                                  console.log('register 10 result.rows:', result.rows);
					              console.log('register 11 result.rows[0]:', result.rows[0]);
					              //console.log('register 12 result.rows[0].user_id:', result.rows[0].user_id);
					              res.json({
					                            message: 'User register successfully',
					                            body: {
					                                user: {jwtToken,name, email, password:bcryptPassword}
					                              }
					              
					                        });                        
					                     });
					                     });
    });


     
    });

    

   
});

module.exports = router;