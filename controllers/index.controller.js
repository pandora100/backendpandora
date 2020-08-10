const pg = require('pg');
const indexCtrl = {};

const Pool = pg.Pool;

const pool = new Pool({
   host: 'ec2-52-71-55-81.compute-1.amazonaws.com',
   user: 'cblflfqkoftamy',
   password: 'c3c022c436e2c3a11c3b4dc0c1e52433f4ddaa20ed2552afcd521784e951b87c',
   database: 'd7pbr7epm2c2ml'

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
