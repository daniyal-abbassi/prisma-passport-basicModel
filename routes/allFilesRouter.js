const { Router } = require('express');
const File = require('../models/File');
const allFilesRouter = Router();



allFilesRouter.get('/', async (req, res) => {
    try {
        const files = await File.showFiles();
        res.render('files', { files });
    } catch (error) {
        console.error('ERROR SHOWING ALL FILES: ', error);
        res.status(500).send('INTERNAL ERROR', error)
    }
})

module.exports=allFilesRouter;