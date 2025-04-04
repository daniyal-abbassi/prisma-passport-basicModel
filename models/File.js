// database model queries file
const pool = require('../db/pool');

// query object: File

const File = {
    //show all files
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
    saveFile: async(fileName,type,data,size)=>{
     try {
         await pool.query('INSERT INTO files(filename,type,data,size) VALUES($1,$2,$3,$4)',[fileName,type,data,size])
     } catch (error) {
         console.error('ERROR IN READING FILES',error);
         throw error;
     }
    }
 }
 
 module.exports=File;