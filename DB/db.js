const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-18-235-20-228.compute-1.amazonaws.com',  
    user: 'bjtadqbtjojevm',  
    database: 'd1vli1k0tgfhb6',  
    password: `${process.env.DATABSE_PASSWORD}`,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});  


module.exports = pool;