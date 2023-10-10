import asyncHandler from 'express-async-handler';
import jwt  from 'jsonwebtoken';
import User from '../models/user.js';


export const protect = asyncHandler(async (req,res,next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({
        success: false,
        message: "not authorized, please login",
      })
    }
    const verified = jwt.verify(token ,process.env.JWT_SECRET)
    const user = await User.findById(verified.id).select("-password")
    if (!user){
      res.json({
        success: false,
        message: "User not found",
      })
    }
    req.user = user 
    next()
  }catch (error) {
    res.json({
      success: false,
      message: "not authorized, please login",
    })
  }
})