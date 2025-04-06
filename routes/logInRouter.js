const {Router} = require('express');
const passport = require('passport');
const logInRouter = Router();

logInRouter.get('/',(req,res)=>{
    res.render('logIn')
})

logInRouter.post('/',passport.authenticate('local-logIn',{
    successRedirect: '/folders',
    failureRedirect: '/log-in',
    failureFlash: true,
}))


module.exports=logInRouter;