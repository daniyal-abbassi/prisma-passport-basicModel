const { Router } = require('express');
const folderRouter = Router();
const dbClient = require('../models/dbClient');
const ensureLoggedIn = require('../middleware/auth');

// main folders page router
folderRouter.get('/',ensureLoggedIn,async (req, res) => {
    try {
        const { user_id } = req.user;
        //show root folder and its subfolders
        const subfolders = await dbClient.showRootFolder(user_id);
        const files = await dbClient.showFiles(null,user_id); // No folder ID for root level files (if you allow this)

        res.render('files', {
            layout: './layouts/main',
            title: 'Files',
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


folderRouter.get('/:folderId',ensureLoggedIn,async (req, res) => {
    let folderId = req.params.folderId;
    folderId = parseInt(folderId);
    const { user_id } = req.user;
    try {
        //get the current folder
        const currentFolder = await dbClient.getParentFolderWithId(folderId,user_id);

        //get subfolders in parant folder
        const subFolders = await dbClient.getSubFoldersWithId(folderId,user_id);

        //get the files inside this folder
        const files = await dbClient.showFiles(folderId,user_id);

        //folder paths array - contains of an object{id,name}
        let currentPath = [];
        if (currentFolder) {
            let ancestor = currentFolder;
            while (ancestor) {
                currentPath.unshift({ id: ancestor.folder_id, name: ancestor.name });
                if(ancestor.parent_id===null) {
                    break
                }
                ancestor = await dbClient.getParentFolderWithId(ancestor.parent_id,user_id);
            }
        }

        res.render('files', {
            layout: './layouts/main',
            title: 'Files',
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
folderRouter.post('/',async(req,res)=>{
    try {
        let {name,parentId} = req.body;
        //get user_id
        const {user_id} = req.user;
        //handle null in prisma model(if null or number)
        await dbClient.createFolder(name,parentId,user_id)
        
        res.sendStatus(204);
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).send('Error creating folder');
    
    }
})
// edit a folder's name 
folderRouter.post('/:folderId/edit',async(req,res)=>{
    try {
        const {name} = req.body;
        const folderId = req.params.folderId;
        await dbClient.editFolderNameById(name,folderId);
        res.redirect(`/folders/${folderId}`);
    } catch (error) {
        console.error('Error editing folder:', error);
        res.status(500).send('Error editing folder');
        
    }
})
// delete folder router
folderRouter.post('/:folderId/delete',async(req,res)=>{
    try {
        const {folderId} = req.params;
        await dbClient.deleteFolderWithId(folderId);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).send('Error deleting folder');
    }
})
//share folder router
folderRouter.post('/:folderId/share',ensureLoggedIn,async(req,res)=>{
    try {
        // should give a shara link for this folderId with public path
        console.log('folder url is: ',req.url)
        console.log(req.headers.origin)
        console.log(`final link will be: \n -->  ${req.headers.origin}/public${req.url}`)
        res.json({url: `${req.headers.origin}/public${req.url}`,statusbar: 'success'})
    } catch (error) {
        console.error('Error share folder:', error);
        res.status(500).send('Error sharing folder');
    }
})
// deletin a file
folderRouter.post('/files/:fileId/delete',ensureLoggedIn,async(req,res)=>{
    try {
        const {fileId} = req.params;
        await dbClient.deleteFile(fileId)
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Error deleting file');
    }
})
module.exports = folderRouter;