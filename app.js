const express = require('express');
const app = express();
const File = require('./database');


app.set('view engine','ejs');


app.get('/',async (req,res)=>{
    try {
        const files = await File.showFiles();
        console.log(files)
    } catch (error) {
        console.error('error gettingfiles in app.js: ',error)
        res.status(500).send('error getting files, SERVER ERROR: ',error)
    }
})

app.listen(3000,()=>console.log('app is runnig on port: ',3000))