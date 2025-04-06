const ensureLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('error','please login first')
    res.redirect('/log-in')
}

module.exports=ensureLoggedIn;