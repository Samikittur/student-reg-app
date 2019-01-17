const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const usersSchemaModel = require('../models/users-schema');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    // This config holds database connection parameter and secret for generating JWT token
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = db.secret;
    console.log('jwt');
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log('jwt2');
        usersSchemaModel.findOne({ id: jwt_payload._doc.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
        // where is this user.id going? Are we supposed to access this anywhere?
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        usersSchemaModel.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local.signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passoword',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            console.log(username);
            console.log(password);
            usersSchemaModel.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, isMatch);
                    } else {
                        return done(null, false, { message: 'Wrong Password' });
                    }
                });
                return done(null, user);
            });
        }
    ));


}
