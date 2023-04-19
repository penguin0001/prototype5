const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            // error
            if (err) return done(err);
        
            // no user
            if (!user) {
                return done(null, false, {
                    message: 'No user with this email exists'
                });
            }
            
            // user w invalid password
            if (!user.validatePassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password'
                });
            }

            // user!
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});
