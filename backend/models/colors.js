import mongoose from "mongoose";

const ColorsSchema = mongoose.Schema (
  {
    name:{
      type: String,
      required: [true, "please enter name of color"],
    },
  }
)

const Color = mongoose.models.Colors || mongoose.model("Color", ColorsSchema);

export default Color;