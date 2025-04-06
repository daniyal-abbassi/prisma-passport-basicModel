const prisma = require('./client');


// QUERIES FOR FILE, FOLDER AND USER MODEL
const dbClient = {
    // FILE QUERIES
    showFiles: async(folderId)=>{
        try {
            const files = await prisma.file.findMany({
                where: {
                    folder_id: folderId===null ? null: folderId
                },
            });
            return files;
        } catch (error) {
            console.error('ERROR IN READING FILES', error);
            throw error;
        } 
    },
    saveFile: async(filename,url,type ,date ,size ,folderId,userId)=>{
        try {
            await prisma.file.create({
                data: {
                    filename,
                    url,
                    type,
                    date,
                    size,
                    folder_id: folderId===null?null:folderId,
                    user_id: userId, 
                },
            })
        } catch (error) {
            console.error('ERROR IN CREATING FILE', error);
            throw error;
        } 
    },
    deleteFile: async(fileId)=>{
        try {
            await prisma.file.delete({
                where: {
                    file_id: fileId,
                }
            })
        } catch (error) {
            console.error('ERROR IN DELETING FILE', error);
            throw error;
        } 
    },
    // FOLDER QUERIES
    showRootFolder: async()=>{
        try {
            const folders = await prisma.folder.findMany({
                where: {
                    parent_id: null,
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
    getParentFolderWithId: async(folderId)=>{
        try {
            const currentFolder = await prisma.folder.findFirst({
                where: {
                    folder_id: folderId,
                },
            })
            return currentFolder;
        } catch (error) {
            console.error('ERROR IN GET PARENT FOLDER WITH ID', error);
            throw error;
        } 
    },
    getSubFoldersWithId: async(folderId)=>{
        try {
            const subFolders = await prisma.folder.findMany({
                where: {
                    parent_id: folderId,
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
    createFolder: async(name,parantId,userId)=>{
        try {
            await prisma.folder.create({
                data: {
                    name,
                    parent_id: parantId===null ? null:parantId,
                    user_id: userId,
                }
            })
        } catch (error) {
            console.error('ERROR IN CREATING FOLDER', error);
            throw error;
        } 
    },
    editFolderNameById: async(newName,folderId)=>{
        try {
            await prisma.folder.update({
                where: {
                    folder_id: folderId,
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
        try {
            await prisma.folder.delete({
                where: {
                    folder_id: folderId,
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
        try {
            const user = await prisma.user.findFirst({
                where: {
                    user_id: userId,
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