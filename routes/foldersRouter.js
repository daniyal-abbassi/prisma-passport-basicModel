const { Router } = require('express');
const folderRouter = Router();
const pool = require('../db/pool');
const File = require('../models/File');
const ensureLoggedIn = require('../middleware/auth');

// main folders page router
folderRouter.get('/folders',ensureLoggedIn,async (req, res) => {
    try {
        //show root folder and its subfolders
        const subfolders = await File.showFolders();
        const files = await File.showFiles(null); // No folder ID for root level files (if you allow this)

        res.render('files', {
            folders: subfolders,
            files: files,
            currentFolderId: null,
            currentPath: [{ id: null, name: 'Root' }]
        });
    } catch (error) {
        console.error('Error fetching root level:', error);
        res.status(500).send('Error fetching root level');
    }
});


folderRouter.get('/folders/:folderId',async (req, res) => {
    const { folderId } = req.params;
    try {
        //get the current folder
        const currentFolder = await File.getFolderWithId(folderId);

        //get subfolders in parant folder
        const subFolders = await File.getSubFoldersWithId(folderId);

        //get the files inside this folder
        const files = await File.showFiles(folderId);

        //folder paths array - contains of an object{id,name}
        let currentPath = [];
        if (currentFolder) {
            let ancestor = currentFolder;
            while (ancestor) {
                currentPath.unshift({ id: ancestor.folder_id, name: ancestor.name });
                ancestor = await File.getFolderWithId(ancestor.parent_id);
            }
        }

        res.render('files', {
            folders: subFolders,
            files: files,
            currentFolderId: folderId,
            currentPath: currentPath
        })
    } catch (error) {
        console.error('Error fetching folder contents:', error);
        res.status(500).send('Error fetching folder contents');
    }
})
// create a folder
folderRouter.post('/folders',async(req,res)=>{
    try {
        let {name,parentId} = req.body;
        if(!parentId) {
            await File.createFolder(name,null);
        } else {
            await File.createFolder(name,parentId)
        }
        res.sendStatus(204);
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).send('Error creating folder');
    
    }
})
// edit a folder's name 
folderRouter.post('/folders/:folderId/edit',async(req,res)=>{
    try {
        const {name} = req.body;
        const folderId = req.params.folderId;
        await File.editFolderNameById(name,folderId);
        res.sendStatus(204);
        res.redirect(`/folders/${folderId}`);
    } catch (error) {
        console.error('Error editing folder:', error);
        res.status(500).send('Error editing folder');
        
    }
})
// delete folder router
folderRouter.post('/folders/:folderId/delete',async(req,res)=>{
    try {
        const {folderId} = req.params;
        await File.deleteFolder(folderId);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).send('Error deleting folder');
    }
})

// deletin a file
folderRouter.post('/files/:fileId/delete',ensureLoggedIn,async(req,res)=>{
    try {
        const {fileId} = req.params;
        await File.deleteFile(fileId)
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Error deleting file');
    }
})
module.exports = folderRouter;