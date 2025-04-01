const express = require('express');
const app = express();



app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('form')
})

app.listen(3000,()=>console.log('app is runnig on port: ',3000))