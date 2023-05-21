const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../configs/generateToken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:8383/auth/google/callback",
      // userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
    },
    async (accessToken, refreshToken, profile, cb) => {
      // console.log(profile);

      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            passwd: profile.id,
            image: profile.photos[0].value,
          });
        }
        cb(null, user);
      } catch (err) {
        cb(err, null);
      }
    }
  )
);

// To set the authenticated user data on the `req.user` object
passport.serializeUser(function (user, done) {
  process.nextTick(function() {
  done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function() {
    return done(null, user);
    });
});

const callBack = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "http://localhost:3000",
    }
    ,
    (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).json({
          _id: user._id,
          name:user.name,
          email:user.email,
          image:user.image,
          token:generateToken(user.id),
      });
      });
    }
  )(req, res, next);
});

module.exports = {
  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),
  googleAuthCallback: callBack,
};
