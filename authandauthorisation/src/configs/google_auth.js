const passport = require("passport")
const googleclintid = "729666032295-thgvsrn3pvrafibb1nnu4jbsof4m99ml.apps.googleusercontent.com"
const googleclintsecret = "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"

const User = require("../models/user.model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require("uuid");


passport.use(new GoogleStrategy({
        clientID: googleclintid,
        clientSecret: googleclintsecret,
        callbackURL: "http://localhost:4321/auth/google/callback",
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        let user = await User.findOne({email : profile?._json?.email}).lean().exec()

        if(!user) {
            user = await User.create({
                email : profile._json.email,
                password: uuidv4(),
                role: ["customer"]
            })
        }
        console.log(user)


        return done(null, user);
    }
));
module.exports = passport