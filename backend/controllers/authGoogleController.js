const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../configs/generateToken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8383/auth/google/callback",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
  }
));

const callBack = asyncHandler(async(req,res)=>{
    

    // const userExists = await User.findOne({email});

    // if(userExists){
    //     res.status(400);
    //     throw new Error("User already exists");
    // }

    // const user = await User.create({
    //     name,
    //     email,
    //     passwd,
    //     image,
    // });

    // if(user){
    //     res.status(201).json({
    //         _id: user._id,
    //         name:user.name,
    //         email:user.email,
    //         image:user.image,
    //         token:generateToken(user.id),
    //     });
    // }else{
    //     res.status(400);
    //     throw new Error("Failed to create the user");
    // }
});

module.exports = {
    googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),
    googleAuthCallback: passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  };