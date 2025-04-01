const {Pool} = require('pg')

const pool = new Pool({
    connectionString: 'postgresql://lain:123@localhost:5432/test',
    ssl: {
        rejectUnauthorized: false,
    }
})

pool.on('error',(error,client)=>{
    console.error('error connecting to database')
});
pool.connect()
    .then(()=>console.log('database connected seccessfully'))
    .catch((e)=>console.error('error connectiong to database: ',error))

const File = {
   showFiles: async()=>{
    try {
        const results = await pool.query('SELECT * FROM files');
        return results.rows;
        
    } catch (error) {
        console.error('ERROR IN READING FILES',error)
        throw error
    }
   }
}

module.exports=File;