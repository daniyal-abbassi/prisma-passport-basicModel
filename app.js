const express = require('express');
const app = express();
//router files
const uploadRouter= require('./routes/uploadRouter');
const allFilesRouter = require('./routes/allFilesRouter');

app.set('view engine','ejs');



app.use('/files',allFilesRouter)
app.use('/upload',uploadRouter)


app.listen(3000,()=>console.log('app is runnig on port: ',3000))