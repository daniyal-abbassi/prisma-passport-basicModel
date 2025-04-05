// uploadRouter controller file
const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

const uploadController = {
    //router get request controller
    uploadGet: async (req,res)=>{
        try {
            //get folderId from query
            const folderId = req.query.folderId || null;
            res.render('form',{folderId: folderId})
        } catch (error) {
            console.error('ERROR IN UPLOAD CONTROLLER: ',error)
            res.status(500).send('ERROR GETTING FILES, SERVER ERROR: ',error)
        }
    },
    //router post request controller
    uploadPost: async(req,res)=>{
        try {
            //get folderId
            const {folderId} = req.body || null;
            //upload to cloudinary
            const result = await cloudinary.uploader.upload_stream(
                //let cloudinary figure out the type of file
                {resource_type: "auto"},
                //callback function
                async(error,result)=>{
                    if(error) {
                        return res.status(500).send("Cloudinary upload failed.");
                    }
                    //get size and type,etc...
                    const {format,created_at,bytes} = result;
                    
                    //get the url
                    const fileUrl = result.secure_url;
                    //save to database
                    await File.saveFile(req.body.name,fileUrl,format,created_at,bytes,folderId)
                    if(folderId) {
                        res.redirect(`/folders/${folderId}`)
                    } else {
                        res.redirect(`/folders`)
                    }
                }
            ).end(req.file.buffer)
        } catch (error) {
            console.error('ERROR IN UPLOAD CONTROLLER: ',error)
            res.status(500).send('ERROR SAVING FILE, SERVER ERROR: ',error)
            
        }
    },
}


module.exports=uploadController;