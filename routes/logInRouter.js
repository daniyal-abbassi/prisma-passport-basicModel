const {Router} = require('express');
const passport = require('passport');
const logInRouter = Router();

logInRouter.get('/',(req,res)=>{
    const errorMessages = {error: req.flash('error')}
    res.render('logIn',{layout: './layouts/main',title: 'Log in',errorMsgs: errorMessages})
})

logInRouter.post('/',passport.authenticate('local-logIn',{
    successRedirect: '/folders',
    failureRedirect: '/log-in',
    failureFlash: true,
}))


module.exports=logInRouter;