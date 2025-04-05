const express = require('express');
const app = express();
require('dotenv').config();

//router files
const uploadRouter= require('./routes/uploadRouter');
const folderRouter = require('./routes/foldersRouter');
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dajzulqra', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs');




app.use('/upload',uploadRouter)
app.use('/',folderRouter)


app.listen(3000,()=>console.log('app is runnig on port: ',3000))