<<<<<<< HEAD
const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-18-235-20-228.compute-1.amazonaws.com',  
    user: 'bjtadqbtjojevm',  
    database: 'd1vli1k0tgfhb6',  
    password: '81aa6a0e96db3eefd2b369c76003cb136c97bd66fa1a8e03d97bf936a2241a57',
    port: 5432,
    ssl: true
});  
=======
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
>>>>>>> 1aa57f4917a112a7d7fba5bdb704578d202fc528


module.exports = client;