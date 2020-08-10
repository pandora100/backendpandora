const pg = require('pg');
const indexCtrl = {};

const Pool = pg.Pool;

const pool = new Pool({
   host: 'ec2-54-243-67-199.compute-1.amazonaws.com',
   user: 'lxatxmthaijzgw',
   password: '8cc7a6fa697c1d2ee528bb8b35fc5e38cb8e1c6050d8e9f137f78a80ebb0f2a5',
   database: 'd7uusa3pkvt9p3'

});

/// Controllers
indexCtrl.getUsers = (req, res) => {

    // const response = await pool.query('SELECT * FROM users');
    // res.status(200).json(response.rows);
    
    pool.query('SELECT * FROM users;',  (err, result) => {
    if (err) {
    return console.error('Error executing query', err.stack);
    }
    
    console.log('Bandera indexCtrl.getUsers end results:',result.rows);
    return res.status(200).json(result.rows);

   })
  };




module.exports = indexCtrl;

/*
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'firstapi'
};
/// para heroku
const pool = new Pool({
   host: 'ec2-54-91-178-234.compute-1.amazonaws.com',
   user: 'ygsstbshhyjhzd',
   password: 'dc1341585983bd43fcb77fbad57c7ddac90cf54916b914fbeb0edbb44e52e86a',
   database: 'd5b0rc9ekl9c02'
};
*/
