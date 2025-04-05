const {Router} = require('express');
const folderRouter = Router();
const pool = require('../db/pool');

folderRouter.get('/',async(req,res)=>{
    try {
        const {rows} = await pool.query('SELECT id,folder FROM folders WHERE parant_id IS NULL ORDER BY name');
        
    } catch (error) {
        console.error('Error fetching top-level folders:', error);
        res.status(500).send('Error fetching folders');
    }
})



module.exports=folderRouter;