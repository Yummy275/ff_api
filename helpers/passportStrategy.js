const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');

passport.use(
    new LocalStrategy((username, password, done) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err || !user) {
                //error finding user or no user
                return done(err);
            }
            //compare password
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    // passwords match
                    return done(null, user);
                } else {
                    // passwords do not match
                    return done({ message: 'Incorrect password' });
                }
            });
        });
    })
);

//extracts cookie
const cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.JWT_SECRET,
        },
        function (jwt_payload, done) {
            UserModel.findOne({ _id: jwt_payload._id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }
    )
);
