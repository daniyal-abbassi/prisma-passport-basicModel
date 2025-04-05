// database model queries file
const pool = require('../db/pool');
// query object: File

const File = {
    showFiles: async()=>{
        try {
            const results = await pool.query('SELECT * FROM files');
            return results.rows;
        } catch (error) {
            console.error('ERROR IN READING FILES',error);
         throw error;
        }
    },
    //insert to database(file)
    saveFile: async(filename,url,type,date,size)=>{
     try {
         await pool.query('INSERT INTO files(filename,url,type,date,size) VALUES($1,$2,$3,$4,$5)',[filename,url,type,date,size]);
     } catch (error) {
         console.error('ERROR IN SAVING FILE',error);
         throw error;
     }
    }
 }
 
 module.exports=File;