var UserSchema = require('../models/User');
let LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, passport){
    app.post('/authentication/register', function(req, res){
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let password = req.body.password;

        let user = new UserSchema.User({
            first_name,
            last_name,
            email,
            password,
            isInstructor: false
        });

        UserSchema.createUser(user, function(err, user){
            console.log(err);
            if(err) res.status(401).json({})
            if(user) res.status(200).json({})
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
        function(req, email, password, done) {
            UserSchema.getUserByEmail(email, function(err, user) {
                if (!user) {
                    return done(null, false);
                }
                UserSchema.comparePassword(password, user.password, function(err, isMatch) {
                    if(isMatch){
                        return done(null, user);
                    }
                    else{
                        return done(null, false);
                    }
                });
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        UserSchema.getUserById(id, function(err, user) {
            done(err, user);
        });
    });

    app.post('/authentication/login', passport.authenticate('local'), 
        function(req, res){
            res.status(200).json({
                email: req.user.email,
                isInstructor: req.user.isInstructor
            });
        }
    );

    app.post('/authentication/email_exists', function(req, res){
        UserSchema.getUserByEmail(req.body.email, function(err, user) {
            if(user){
                res.status(409).json({message: "Email already exists."});
            }else{
                res.status(200).json({message: "Email is available."});
            }
        });
    });

    app.get('/authentication/logout', function(req, res){
        req.logout();
        res.end();
    });

    app.get('/authentication/login', function(req, res){
        if(req.user){
            res.status(200).json({
                email: req.user.email,
                isInstructor: req.user.isInstructor
            });
        }else{
            res.status(401).json({user: null});
        }
    });

}


