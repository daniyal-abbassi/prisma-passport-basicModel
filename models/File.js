// database model queries file
const pool = require('../db/pool');
// query object: File

const File = {
    showFiles: async(folder_id)=>{
        try {
            const results = await pool.query('SELECT * FROM files WHERE folder_id=$1',[folder_id]);
            return results.rows;
        } catch (error) {
            console.error('ERROR IN READING FILES',error);
         throw error;
        }
    },
    //insert to database(file)
    saveFile: async(filename,url,type,date,size,folder_id)=>{
     try {
         await pool.query('INSERT INTO files(filename,url,type,date,size,folder_id) VALUES($1,$2,$3,$4,$5,$6)',[filename,url,type,date,size,folder_id]);
     } catch (error) {
         console.error('ERROR IN SAVING FILE',error);
         throw error;
     }
    },
    //delete a file
    deleteFile: async(file_id)=>{
        try {
            const results = await pool.query('DELETE FROM files WHERE file_id = $1',[file_id])
        } catch (error) {
            console.error('ERROR DELETING FILE', error);
            throw error;
        }
    }
 }
 
 module.exports=File;