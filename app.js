const express = require('express');
const app = express();
require('dotenv').config();
// auth
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool');
const flash = require('connect-flash');
require('./passport-config');
//router files
const uploadRouter = require('./routes/uploadRouter');
const folderRouter = require('./routes/foldersRouter');
const signUpRouter = require('./routes/signUpRouter');
const logInRouter = require('./routes/logInRouter');
const publicRouter = require('./routes/publicRouter');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dajzulqra',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static('public'));
app.set('layout','./layouts/main')
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

//session
app.use(session({
    store: new pgSession({
        pool: pool,
        createTableIfMissing: true,
    }),
    secret: 'we-all-are-connected',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.get('/log-out',(req,res)=>{
    req.logout(err=>{
        if(err) {
            return next(err)
        }
        res.redirect('/log-in')
    })
})
app.use('/folders', folderRouter)
app.use('/sign-up', signUpRouter)
app.use('/log-in', logInRouter)
app.use('/upload', uploadRouter)
app.get('/',(req,res)=>{
    res.redirect('/sign-up')
})
app.use('/public',publicRouter)
app.listen(3000, () => console.log('app is runnig on port: ', 3000))