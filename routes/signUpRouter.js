const { Router } = require('express');
const passport = require('passport');
const signUpRouter = Router();

signUpRouter.get('/', (req, res) => {
    const errorMessages = { error: req.flash('error') }
    res.render('signUp', { layout: './layouts/main',title: 'Sign Up',errorMsgs: errorMessages })
})

signUpRouter.post('/',  (req, res,next) => {
    const { username, password, 'confirm-pass': confirmPassword } = req.body;
    const errorMsgs = { error: [] };

    if (password !== confirmPassword) {
        errorMsgs.error.push('Passwords do not match.');
        return res.render('signUp', {layout: './layouts/main',title: 'Sign Up', errorMsgs: errorMsgs });
    }
    next();
}, passport.authenticate('local-signUp', {
    successRedirect: '/folders',
    failureRedirect: '/sign-up',
    failureFlash: true,
}))


module.exports = signUpRouter;