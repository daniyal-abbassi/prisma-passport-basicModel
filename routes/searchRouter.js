const {Router} = require('express');
const searchRouter = Router();
const dbClient = require('../models/dbClient');

searchRouter.get('/',async(req,res)=>{
    try {
        const searchValue = req.query.value;
        const folders = await dbClient.searchAllFolders(searchValue);
        const files = await dbClient.searchAllFiles(searchValue);
        res.json({folders,files})
    } catch (error) {
        console.error('Error SEARCHING ITEMS:', error);
        res.status(500).send('Error searching items');
    }
})




module.exports=searchRouter;