// uploadRouter controller file
const File = require('../models/File');

const uploadController = {
    //router get request controller
    uploadGet: async (req,res)=>{
        try {
            res.render('form')
        } catch (error) {
            console.error('ERROR IN UPLOAD CONTROLLER: ',error)
            res.status(500).send('ERROR GETTING FILES, SERVER ERROR: ',error)
        }
    },
    //router post request controller
    uploadPost: async(req,res)=>{
        try {
            const {originalname,mimetype,buffer,size} = req.file;
            await File.saveFile(originalname,mimetype,buffer,size);
            const files = await File.showFiles();
            res.render('files',{files})
        } catch (error) {
            console.error('ERROR IN UPLOAD CONTROLLER: ',error)
            res.status(500).send('ERROR SAVING FILE, SERVER ERROR: ',error)
            
        }
    },
}


module.exports=uploadController;