//db.js

const Pool = require("pg").Pool;

const pool = new Pool({
  host: 'ec2-52-71-55-81.compute-1.amazonaws.com',
  user:'cblflfqkoftamy',
  password:  'c3c022c436e2c3a11c3b4dc0c1e52433f4ddaa20ed2552afcd521784e951b87c',
  database: 'd7pbr7epm2c2ml'
});

module.exports = pool;
