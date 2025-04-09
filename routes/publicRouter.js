const { Router } = require('express')
const publicRouter = Router();
const dbClient = require('../models/dbClient');

publicRouter.get('/:folderId/share', async (req, res) => {
    try {
        const folderId = req.params.folderId;
        const {user_id} = req.user;
        //get the current folder
        const currentFolder = await dbClient.getParentFolderWithId(folderId, user_id);

        //get subfolders in parant folder
        const subFolders = await dbClient.getSubFoldersWithId(folderId, user_id);

        //get the files inside this folder
        const files = await dbClient.showFiles(folderId, user_id);

        //folder paths array - contains of an object{id,name}
        let currentPath = [];
        if (currentFolder) {
            let ancestor = currentFolder;
            while (ancestor) {
                currentPath.unshift({ id: ancestor.folder_id, name: ancestor.name });
                if (ancestor.parent_id === null) {
                    break
                }
                ancestor = await dbClient.getParentFolderWithId(ancestor.parent_id, user_id);
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