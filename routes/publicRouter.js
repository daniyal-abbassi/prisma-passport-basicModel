const { Router } = require('express')
const publicRouter = Router();
const dbClient = require('../models/dbClient');

publicRouter.get('/:folderId/share', async (req, res) => {
    try {
        const folderId = req.params.folderId;
        let sharedFolder = await dbClient.sharedFolder(folderId);
        
        
        //get the current folder
        const currentFolder = await dbClient.getSharedParentFolderWithId(folderId);

        //get subfolders in parant folder
        const subFolders = await dbClient.getSharedSubFoldersWithId(folderId);

        //get the files inside this folder
        const files = await dbClient.showSharedFiles(folderId);
        console.log('folderrouter.post: should set share to ture:  ',currentFolder)
        //folder paths array - contains of an object{id,name}
        let currentPath = [];
        if (currentFolder) {
            let ancestor = currentFolder;
            while (ancestor) {
                currentPath.unshift({ id: ancestor.folder_id, name: ancestor.name });
                if (ancestor.parent_id === null) {
                    break
                }
                ancestor = await dbClient.getSharedParentFolderWithId(ancestor.parent_id, share=true);
            }
        }

        res.render('share', {
            layout: './layouts/main',
            title: 'Shared Folder',
            folders: subFolders,
            files: files,
            currentFolderId: folderId,
            currentPath: currentPath,
            rootId: folderId,
        })
    } catch (error) {
        console.error('Error opening share url:', error);
        res.status(500).send('Error Opening shared folder');
    }

})


module.exports = publicRouter;