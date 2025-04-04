// connect to database file
const {Pool} = require('pg')



const pool = new Pool({
    connectionString: 'postgresql://lain:123@localhost:5432/test',
    ssl: {
        rejectUnauthorized: false,
    }
})

// try to connect to database/error handling

pool.on('error',(error,client)=>{
    console.error('error connecting to database')
});
pool.connect()
    .then(()=>console.log('database connected seccessfully'))
    .catch((e)=>console.error('error connectiong to database: ',error))



module.exports = pool;


