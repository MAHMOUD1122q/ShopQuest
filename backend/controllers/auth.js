import asyncHandler from "express-async-handler";
import User from "../models/user.js"
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import Cookies from "js-cookie";

export const register = asyncHandler(async (req,res) => {
  const {username, email , password} = req.body;
  // validation
  if(!username || !email || !password) {
    res.json({
      success: false,
      message: "please fill in all required fields",
    })
  } 
  if (password.length < 6) {
    res.json({
      success: false,
      message: "password must be at least 6 characters",
    })
  }
  // check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
  return res.json({
    success: false,
    message: "User is already exists. Please try with different email.",
  })
  }
  // check if username already exists
  // 
  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    return res.json({
      success: false,
      message: "this username used. Please try with different username.",
    })
    }
  // hash password 
  const hashPassword = await bcrypt.hash(password , 10)
  // create new user 
  const user = await User.create({
    username,
    email,
    password:hashPassword,
  })
  if (user) {
    res.json({
      success:true,
      massage:"the user has been created"
    })
  }
  if (user) {
    const {_id , username , email , role } = user
    res.cookie("token",token ,{
      path:"/",
      httpOnly: true,
      expires:new Date(Date.now() + 1000 * 86400)
    })
    // send user data 
    res.json({
      _id , username , email , role ,token
    })
  } else {
    res.json({
      success: false,
      message: "Invalid user data",
    })
  }
})

export const login = asyncHandler( async (req,res) => {
  const {email, password} = req.body;

  // validate
  if (!email,!password) {
    res.json({
      success: false,
      message:"please add email and password",
    })
  }
  const user = await User.findOne({email});
  if(!user) {
    res.json({
      success: false,
      message:"User does not exist",
    })
  }
  // check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password); 
  // generate Token
  
  if (user && passwordIsCorrect) {
  const newUser = await User.findOne({email}).select('-password');

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser?.email,
      role: newUser?.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
    res.cookie("token",token,{
      path:"/",
      httpOnly: true,
      expires:new Date(Date.now() + 1000 * 86400)
    })
    // send user data 
    res.json({
      token,
      user: {
        email: newUser.email,
        _id: newUser._id,
        role: newUser.role,
      },
      success: true,
      massage:"login success"
    })
  }else {
    res.json({
      success: false,
      message:"invalid email or password",
    })
  }
})


export const logout = asyncHandler(async (req, res) => {
  res.cookie("token","",{
    path:"/",
    expires:new Date(0)
  });
  res.status(200).json({message:"successfully logged out"})
})

export const getUser = asyncHandler(async(req,res) => {
  const user = await User.findById(req.user._id).select("-password")
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404);
    throw new Error("User not found")
  }

})

export const getLoginStatus = asyncHandler(async(req,res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false)
  }
  const verified = jwt.verify(token ,process.env.JWT_SECRET)
  if (verified) {
    res.json(true)
  }else {
    res.json(false)
  }
})

export const updateUser = asyncHandler(async(req,res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const {username} = user ;
    user.username = req.body.username || username
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } else{
    res.status(404)
    throw new Error('User not found')
  }
})