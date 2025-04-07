const prisma = require('./client');


// QUERIES FOR FILE, FOLDER AND USER MODEL
const dbClient = {
    // FILE QUERIES
    showFiles: async(folderId,userId)=>{
        const parsedFolderId = (folderId==='null'|| folderId==='') ? null : parseInt(folderId);
        const parsedUserId = parseInt(userId);
        try {
            const files = await prisma.file.findMany({
                where: {
                    folder_id: parsedFolderId,
                    user_id: parsedUserId,
                },
            });
            return files;
        } catch (error) {
            console.error('ERROR IN READING FILES', error);
            throw error;
        } 
    },
    saveFile: async(filename,url,type ,date ,size ,folderId,userId)=>{
        const parsedFolderId = (folderId==='null'|| folderId==='') ? null : parseInt(folderId);
        const parsedUserId = parseInt(userId);
        try {
            await prisma.file.create({
                data: {
                    filename,
                    url,
                    type,
                    date,
                    size,
                    folder_id: parsedFolderId,
                    user_id: parsedUserId, 
                },
            })
        } catch (error) {
            console.error('ERROR IN CREATING FILE', error);
            throw error;
        } 
    },
    deleteFile: async(fileId)=>{
        const parsedFileId = parseInt(fileId);
        try {
            await prisma.file.delete({
                where: {
                    file_id: parsedFileId,
                }
            })
        } catch (error) {
            console.error('ERROR IN DELETING FILE', error);
            throw error;
        } 
    },
    // FOLDER QUERIES
    showRootFolder: async(userId)=>{
        const parsedUserId = parseInt(userId);
        try {
            const folders = await prisma.folder.findMany({
                where: {
                    parent_id: null,
                    user_id: parsedUserId,
                },
                orderBy: {
                    name: 'asc',
                }
            })
            return folders;
        } catch (error) {
            console.error('ERROR IN SHOWING ROOT FOLDER', error);
            throw error;
        } 
    },
    getParentFolderWithId: async(folderId,userId)=>{
        const parsedFolderId = (folderId==='null'||folderId===null||folderId==='') ? null: parseInt(folderId);
        const parsedUserId = parseInt(userId)
        try {
            const currentFolder = await prisma.folder.findFirst({
                where: {
                    folder_id: parsedFolderId,
                    user_id: parsedUserId,
                },
            })
            return currentFolder;
        } catch (error) {
            console.error('ERROR IN GET PARENT FOLDER WITH ID', error);
            throw error;
        } 
    },
    getSubFoldersWithId: async(folderId,userId)=>{
        const parsedFolderId = (folderId==='null'||folderId===null) ? null:parseInt(folderId);
        const parsedUserId = parseInt(userId);
        try {
            const subFolders = await prisma.folder.findMany({
                where: {
                    parent_id: parsedFolderId,
                    user_id: parsedUserId,
                },
                orderBy: {
                    name: 'asc'
                }
            })
            return subFolders;
        } catch (error) {
            console.error('ERROR IN GET SUB-FOLDER WITH ID', error);
            throw error;
        } 
    },
    createFolder: async(name,parentId,userId)=>{
        const parsedParentId = (parentId===null||parentId==='null'||parentId==='')?null:parseInt(parentId)
        const parsedUserId = parseInt(userId);
        try {
            await prisma.folder.create({
                data: {
                    name,
                    parent_id: parsedParentId,
                    user_id: parsedUserId,
                }
            })
        } catch (error) {
            console.error('ERROR IN CREATING FOLDER', error);
            throw error;
        } 
    },
    editFolderNameById: async(newName,folderId)=>{
        const parsedFolderId = parseInt(folderId);
        try {
            await prisma.folder.update({
                where: {
                    folder_id: parsedFolderId,
                },
                data: {
                    name: newName,
                }
            })
        } catch (error) {
            console.error('ERROR IN EDITING FOLDER-NAME WITH ID', error);
            throw error;
        } 
    },
    deleteFolderWithId: async(folderId)=>{
        const parsedFolderId = parseInt(folderId);
        try {
            await prisma.folder.delete({
                where: {
                    folder_id: parsedFolderId,
                },
            })
        } catch (error) {
            console.error('ERROR IN DELETING FOLDER WITH ID', error);
            throw error;
        } 
    },
    // USER QUERIES

    findUserWithUsername: async(username)=>{
        try {
            const user = await prisma.user.findFirst({
                where: {
                    username,
                }
            });
            return user;
        } catch (error) {
            console.error('ERROR IN FINDING USER WITH USERNAME', error);
            throw error;
        } 
    },
    createUser: async(username,password)=>{
        try {
            const user = await prisma.user.create({
                data: {
                    username,
                    password,
                }
            });
            return user;
        } catch (error) {
            console.error('ERROR IN CREATING USER', error);
            throw error;
        } 
    },
    findUserById: async(userId)=>{
        const parsedUserId = parseInt(userId);
        try {
            const user = await prisma.user.findFirst({
                where: {
                    user_id: parsedUserId,
                }
            });
            return user;
        } catch (error) {
            console.error('ERROR IN FINDING USER WITH ID', error);
            throw error;
        } 
    }
}

module.exports=dbClient;