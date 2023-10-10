import mongoose from "mongoose";


const userSchema = mongoose.Schema(
  {
    username:{
      type:String,
      required: [true , 'please add your name'],
      unique:[true , 'this username is taken'],
    },
    email:{
      type: String,
      required: [true, "please enter your email"],
      unique:true,
      trim:true,
    },
    password: {
      type:String,
      required:[true,'please enter your password'],
    },
    role: {
      type:String,
      default:"customer",
      enum:["customer","admin"],
    },
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User ;