const express = require('express');
const app = express();
const File = require('./database');
const multer = require('multer');

const upload = multer({storage: multer.memoryStorage()})

app.set('view engine','ejs');




app.get('/',async (req,res)=>{
    try {
        res.render('form')
    } catch (error) {
        console.error('error gettingfiles in app.js: ',error)
        res.status(500).send('error getting files, SERVER ERROR: ',error)
    }
})

app.post('/upload',upload.single('file'),async(req,res)=>{
    try {
        const {originalname,mimetype,buffer} = req.file;
        console.log('this is req.file in post route: ',req.file)
        await File.saveFile(originalname,mimetype,buffer);
    } catch (error) {
        console.error('error saving file in app.js: ',error)
        res.status(500).send('error save files, SERVER ERROR: ',error)
        
    }
})

app.listen(3000,()=>console.log('app is runnig on port: ',3000))