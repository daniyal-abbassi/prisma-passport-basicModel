const { Router } = require('express');
const folderRouter = Router();
const pool = require('../db/pool');
const File = require('../models/File');

folderRouter.get('/folder/:folderId', async (req, res) => {
    const { folderId } = req.params;
    try {
        //get the current folder
        const currentFolderResult = await pool.query('SELECT * FROM folders WHERE folder_id=$1', [folderId]);
        const currentFolder = currentFolderResult.rows[0];

        //get subfolders in parant folder
        const subFoldersResult = await pool.query('SELECT * FROM folders WHERE parent_id=$1 ORDER BY name', [folderId]);
        const subFolders = subFoldersResult.rows;

        //get the files inside this folder
        const files = await File.showFiles(folderId);

        //current path
        let currentPath = [];
        if (currentFolder) {
            let ancestor = currentFolder;
            while (ancestor) {
                currentPath.unshift({ id: ancestor.folderId, name: ancestor.name });
                const parantResult = await pool.query('SELECT folder_id,name,parant_id FROM folders WHERE folder_id=$1', [ancestor.parant_id]);
                ancestor = parantResult.rows[0]
            }
        }

        res.render('files', { folders: subFolders, files: files, currentFolderId: folderId, currentPath: currentPath })
    } catch (error) {
        console.error('Error fetching folder contents:', error);
        res.status(500).send('Error fetching folder contents');
    }
})


module.exports = folderRouter;