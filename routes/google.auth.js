const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4500/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile)
    let email = profile._json.email;
    let name = profile._json.name;
    const user = {
        name,
        email,
        pass: uuidv4(),
    };
    return cb(null,user);
  }
));

module.exports={passport}