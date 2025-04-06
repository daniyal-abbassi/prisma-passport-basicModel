const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passport = require('passport');
//use model
const dbClient = require('./models/dbClient');
// SIGN-UP CONFIG
passport.use('local-signUp',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    }, async(req,username,password,done) => {
        try {
            //look for user
            const existingUser = await dbClient.findUserWithUsername(username);
            //if user already exist
            if(existingUser) {
                //return done
                return done(null,false,{message: 'user already exist.'})
            }
            // hash the password
            const hashedPassword = await bcrypt.hash(password,10);
            //add to database
            const user = await dbClient.createUser(username,hashedPassword);
            //pass user to done
            return done(null,user)
        } catch (error) {
            return done(error);
        }
    }
))

// LOG-IN CONFIG
passport.use('local-logIn',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    },async(username,password,done)=>{
        try {
            const userExisting = await dbClient.findUserWithUsername(username);
            if(!userExisting) {
                return done(null,false,{message: 'user not found!'})
            }
            //compare passwords
            const passwordMatch = await bcrypt.compare(password,userExisting.password);
            if(!passwordMatch) {
                return done(null,false,{message: 'incorrect password!!!'})
            }
            return done(null,userExisting)
        } catch (error) {
            return done(error);
        }
    }
))


// SERIALIZE
passport.serializeUser((user,done)=>{
    done(null,user.user_id)
})
// DESERIALIZE
passport.deserializeUser(async(user_id,done)=>{
    try {
        const user = await dbClient.findUserById(user_id);
        return done(null,user);
    } catch (error) {
        return done(error);
    }
})