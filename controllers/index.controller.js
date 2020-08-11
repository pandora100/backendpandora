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

/*  
indexCtrl.createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};
*/
indexCtrl.createUser =(req, res) => {
   const name = req.body.name;
   const email = req.body.email;

   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email],(err) => {
     if (err) {
    return console.error('Error executing query', err.stack);
    }
                 res.json({
                            message: 'User Added successfully',
                            body: {
                                user: {name, email}
                              }
              
                        });
     });//end pool.query
};
/*
const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};
*/
indexCtrl.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (err) {
    return console.error('Error executing query', err.stack);
    }
    
    console.log('Bandera indexCtrl.getUserById end results:',result.rows);
    return res.status(200).json(result.rows);
    
      }
   
  );//end pool.query
};
/*
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};
*/
indexCtrl.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const email = req.body.email;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ], (err) => {
         if (err) {
         return console.error('Error executing query', err.stack);
    }
        
        res.json('User Updated Successfully');
        }

    );//end pool.query
   
};

/*
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};
*/
indexCtrl.deleteUser =  (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM users where id = $1', [
        id
    ], (err) => {
         if (err) {
         return console.error('Error executing query', err.stack);
    }

    res.json(`User ${id} deleted Successfully`);
     }
    );//end pool.query
    
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
   host: 'ec2-52-71-55-81.compute-1.amazonaws.com',
   user: 'cblflfqkoftamy',
   password: 'c3c022c436e2c3a11c3b4dc0c1e52433f4ddaa20ed2552afcd521784e951b87c',
   database: 'd7pbr7epm2c2ml'

};
*/
