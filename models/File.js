// database model queries file
const pool = require('../db/pool');
// query object: File

const File = {
    showFiles: async (folder_id) => {
        try {
            const results = await pool.query('SELECT * FROM files WHERE folder_id=$1', [folder_id]);
            return results.rows;
        } catch (error) {
            console.error('ERROR IN READING FILES', error);
            throw error;
        }
    },
    //insert to database(file)
    saveFile: async (filename, url, type, date, size, folder_id) => {
        try {
            await pool.query('INSERT INTO files(filename,url,type,date,size,folder_id) VALUES($1,$2,$3,$4,$5,$6)', [filename, url, type, date, size, folder_id]);
        } catch (error) {
            console.error('ERROR IN SAVING FILE', error);
            throw error;
        }
    },
    //delete a file
    deleteFile: async (file_id) => {
        try {
            const results = await pool.query('DELETE FROM files WHERE file_id = $1', [file_id])
        } catch (error) {
            console.error('ERROR DELETING FILE', error);
            throw error;
        }
    },
    showFolders: async () => {
        try {
            const subfoldersResult = await pool.query('SELECT folder_id, name FROM folders WHERE parent_id IS NULL ORDER BY name'
            );
            return subfoldersResult.rows;
        } catch (error) {
            console.error('ERROR SHOWING FOLDERS', error);
            throw error;
        }
    },
    getFolderWithId: async (folderId) => {
        try {
            const currentFolderResult = await pool.query('SELECT * FROM folders WHERE folder_id=$1', [folderId]);
            return currentFolderResult.rows[0];
        } catch (error) {
            console.error('ERROR SHOWING FOLDERS', error);
            throw error
        }
    },
    getSubFoldersWithId: async (folderId) => {
        try {
            const subFoldersResult = await pool.query('SELECT * FROM folders WHERE parent_id=$1 ORDER BY name', [folderId]);
            return subFoldersResult.rows;
        } catch (error) {
            console.error('ERROR SHOWING FOLDERS', error);
            throw error
        }
    },
    createFolder: async (name, parentId) => {
        try {
            await pool.query('INSERT INTO folders(name,parent_id) VALUES($1,$2)', [name, parentId]);
        } catch (error) {
            console.error('ERROR CREATING FOLDERS', error);
            throw error
        }
    },
    editFolderNameById: async(newName,folderId) => {
        try {
            await pool.query('UPDATE folders SET name=$1 WHERE folder_id=$2', [newName, folderId]);
        } catch (error) {
            console.error('ERROR EDIT FOLDER', error);
            throw error
        }
    },
    deleteFolder: async(folderId)=>{
        try {
            await pool.query('DELETE FROM folders WHERE folder_id=$1', [folderId]);
        } catch (error) {
            console.error('ERROR DELETE FOLDER', error);
            throw error
        }
    }
}

module.exports = File;