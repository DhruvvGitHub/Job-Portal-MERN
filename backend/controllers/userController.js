import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const file = req.file;
    let cloudResponse = null;

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already registered. Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse?.secure_url || "",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const login = async (req, res) => {
  try {
    const {email, password, role} = req.body;

    if(!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered. Please register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password Incorrect",
      });
    }

    if(role !== user.role) {
      return res.status(401).json({
        success: false,
        message: "Account does not exist with current role",
      });
    }

    const tokenData = {
      id: user._id
    }

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET)

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    return res.status(200).cookie("token", token, {httpOnly: true, sameSite: "strict"}).json({
        success: true,
        user,
        message: `Welcome back ${user.fullName}`,
      });
  } catch (error) {
    console.log(error);
  }
}


export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", {maxAge: 0}).json({
      success: true,
      message: "Logout Successful"
    })
  } catch (error) {
    console.log(error);
  }
}


export const update = async (req, res) => {
  try {
    const {fullName, email, password, phoneNumber, bio, skills} = req.body
    console.log(fullName, email,password, phoneNumber, bio, skills);
    
    // cloudinary implementation
    const file = req.file;
    const fileURI = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileURI.content)

    let skillsArray;
    if(skills) {
      skillsArray = skills.split(",")
    }

    console.log("Middleware req.id:", req.id);
    const userId = req.id; // middleware authentication

    let user = await User.findById(userId)

    if(!user) {
      return res.status(400).json({
        success: false, 
        message: "User not found"
      })
    }

    if(fullName) user.fullName = fullName
    if(email) user.email = email
    if(password) user.password = password
    if(phoneNumber) user.phoneNumber = phoneNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillsArray  
    
    if(cloudResponse) {
      user.profile.resume = cloudResponse.secure_url
      user.profile.resumeOriginalName = file.originalname 
    }
    await user.save()

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    return res.status(200).json({
      success: true,
      user,
      message: "Account Updated Successfully"
    })
  } catch (error) {
    console.log(error);
  }
}