const {Router} = require('express');
const passport = require('passport');
const signUpRouter = Router();

signUpRouter.get('/',(req,res)=>{
    res.render('signUp')
})

signUpRouter.post('/',passport.authenticate('local-signUp',{
    successRedirect: '/folders',
    failureRedirect: '/sign-up',
    failureFlash: true,
}))


module.exports=signUpRouter;