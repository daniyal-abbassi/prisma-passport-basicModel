const express = require('express');
const app = express();
require('dotenv').config();
// auth
const passport = require('passport');
const session = require('express-session');
require('./passport-config');
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

//session
app.use(session({
    secret: 'we-all-are-connected',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/upload',uploadRouter)
app.use('/',folderRouter)


app.listen(3000,()=>console.log('app is runnig on port: ',3000))