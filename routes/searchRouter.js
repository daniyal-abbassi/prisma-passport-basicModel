const {Router} = require('express');
const searchRouter = Router();
const dbClient = require('../models/dbClient');

searchRouter.get('/',async(req,res)=>{
    try {
        const searchValue = req.query.value;
        const folders = await dbClient.searchAllFolders(searchValue);
        const files = await dbClient.searchAllFiles(searchValue);
        res.render('search',{title: 'Search',layout: './layouts/main',folders,files,searchValue})
    } catch (error) {
        console.error('Error SEARCHING ITEMS:', error);
        res.status(500).send('Error searching items');
    }
})




module.exports=searchRouter;