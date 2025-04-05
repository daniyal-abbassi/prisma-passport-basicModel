// database model queries file
const pool = require('../db/pool');
const Cloudinary = require('../config/coudinary');
// query object: File

const File = {
    
    //insert to database(file)
    saveFile: async(filename,url)=>{
     try {
         await pool.query('INSERT INTO files(filename,url) VALUES($1,$2)',[filename,url]);
     } catch (error) {
         console.error('ERROR IN READING FILES',error);
         throw error;
     }
    }
 }
 
 module.exports=File;