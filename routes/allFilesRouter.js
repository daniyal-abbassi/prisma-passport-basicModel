const { Router } = require('express');
const File = require('../models/File');
const allFilesRouter = Router();



allFilesRouter.get('/', async (req, res) => {
    try {
        const subfoldersResult = await pool.query(
            'SELECT folder_id, name FROM folders WHERE parent_id IS NULL ORDER BY name',
            []
        );
        const subfolders = subfoldersResult.rows;
        const files = await File.showFiles(null);

        res.render('files', { folders: subfolders, files: files, currentFolderId: null, currentPath: [{ id: null, name: 'Root' }] });
    } catch (error) {
        console.error('Error fetching root level:', error);
        res.status(500).send('Error fetching root level');
    }
})

module.exports=allFilesRouter;