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
            password
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
                if (err) { 
                    return done(err, false, {myMessage: ""})
                }
                if (!user) {
                    return done(null, false, {myMessage: ""});
                }
                UserSchema.comparePassword(password, user.password, function(err, isMatch) {
                    if (err) { 
                        return done(err, false, {myMessage: ""})
                    }
                    if(isMatch){
                        return done(null, user, {myMessage: ""});
                    }
                    else{
                        return done(null, false, {myMessage: ""});
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
            res.json({user: req.user.email});
        }
    );

    app.post('/authentication/email_exists', function(req, res){
        UserSchema.getUserByEmail(req.body.email, function(err, user) {
            if(user){
                res.json({isEmailAvailable: false});
            }else{
                res.json({isEmailAvailable: true});
            }
        });
    });

    app.get('/authentication/logout', function(req, res){
        req.logout();
        res.json({user: req.user.email});
    });

    app.get('/authentication/login', function(req, res){
        if(req.user){
            res.status(200).json();
        }else{
            res.status(401).json();
        }
    });

}


