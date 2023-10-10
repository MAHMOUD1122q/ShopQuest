import mongoose from "mongoose";

const SizeSchema = mongoose.Schema (
  {
    name:{
      type: String,
      required: [true, "please enter name of color"],
    },
  }
)

const Size = mongoose.models.Sizes || mongoose.model("Size", SizeSchema);

export default Size;