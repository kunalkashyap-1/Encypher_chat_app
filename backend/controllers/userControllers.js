const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../configs/generateToken");


const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,passwd,image} = req.body;

    if(!name|| !email || !passwd){
        res.status(400);
        throw new Error("please Enter all the Feilds");
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        passwd,
        image,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            image:user.image,
            token:generateToken(user.id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create the user");
    }
});

const authUser = asyncHandler(async(req,res)=>{
    const {email,passwd} = req.body;

    const userExists = await User.findOne({email});

    if(!userExists){
        res.status(400).json({message:"User does not exist"});
    }
    else{
        const isPasswordValid = await userExists.matchPassword(passwd);
        if(isPasswordValid){
            res.status(200).json({
                _id:userExists._id,
                name:userExists.name,
                email:userExists.email,
                image:userExists.image,
                token:generateToken(userExists._id),
            });
        }
        res.status(401).json({message: "Invalid password"})
    }
});

const allUsers = asyncHandler(async (req,res) => {
    const keyword = req.query.search?{
        $or:[
            {name :{$regex:req.query.search,$options:"i"}},
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    }:{};

    const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
});

module.exports = {registerUser,authUser,allUsers};