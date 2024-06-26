import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import {v2 as cloudinary} from "cloudinary";


export const register = async (req, res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation
        }=req.body

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const result = await cloudinary.uploader.upload(req.file.path)
        const picturePath = result.secure_url
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: 0,
            impressions: 0,
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

export const login = async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email})
        if(!user) return res.status(400).json({msg: "User does not exist."})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalide credentials"})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token, user})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

