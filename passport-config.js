
var LocalStrategy   = require('passport-local').Strategy;
const passport = require("passport");

// load up the user model
var User  = require('./DB/model/UserSchema.js');
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
// expose this function to our app using module.exports

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(async(id, done) =>{
        try {
            const user = await User.findById(id);
            done(null, user);
          } catch(err) {
            done(err);
          };
        });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    async(req, email, password, done) =>{
        try {
            const name = req.body.name;
            const user = await User.create({ name, email, password });
            return done(null, user);
          } catch (error) {
            done(error,{message: "User already defined"});
          }
        })
        );




        passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        async(req, email, password, done)=> { // callback with email and password from our form
            const user = await User.findOne({ email :  email  }).exec(); 
            if(user!==null){
                if (user.password!==password)
                    return done(null, false, {message: "Wrong password"}); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user
                return done(null, user);
            }
            else
                return done(null, false, {message: "No user found with that email"});
            // find a user whose email is the same as the forms email
           

        }));

