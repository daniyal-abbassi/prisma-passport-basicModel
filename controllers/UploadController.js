// uploadRouter controller file
const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

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
            const result = await cloudinary.uploader.upload_stream(
                {resource_type: "auto"},async(error,result)=>{
                    if(error) {
                        return res.status(500).send("Cloudinary upload failed.");
                    }
                    console.log('this is result: ',result)
                    const fileUrl = result.secure_url;
                    //save to database here
                    await File.saveFile(req.body.name,fileUrl)
                    res.send({message: 'file uploaded successfully ',url: fileUrl})
                }
            ).end(req.file.buffer)
        } catch (error) {
            console.error('ERROR IN UPLOAD CONTROLLER: ',error)
            res.status(500).send('ERROR SAVING FILE, SERVER ERROR: ',error)
            
        }
    },
}


module.exports=uploadController;