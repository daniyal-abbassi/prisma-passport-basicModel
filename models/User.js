const pool = require('../db/pool');


const User = {
    findByUsername: async(username)=>{
        try {
            const results = await pool.query('SELECT * FROM users WHERE username=$1',[username]);
            return results.rows[0];
        } catch (error) {
            console.error('ERROR IN USER.findByUsername: ',error);
            throw error;
        }
    },
    createUser: async(username,password)=>{
        try {
            const results = await pool.query('INSERT INTO users(username,password) VALUES($1,$2) RETURNING *',[username,password]);
            return results.rows[0];
        } catch (error) {
            console.error('ERROR IN USER.createUser: ',error);
            throw error;
        }
    },
    findById: async(userId)=>{
        try {
            const results = await pool.query('SELECT * FROM users WHERE user_id=$1',[userId]);
            return results.rows[0];
        } catch (error) {
            console.error('ERROR IN USER.createUser: ',error);
            throw error;
            
        }
    }
}


module.exports=User;