const Pool = require('pg').Pool;

const pool = new Pool({  
    host: process.env.DATABASE_HOST,  
    user: process.env.DATABASE_USER,  
    database: process.env.DATABASE,  
    password: process.env.DATABSE_PASSWORD, 
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});  


module.exports = pool;