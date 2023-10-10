import mongoose from "mongoose";

const CategorySchema = mongoose.Schema (
  {
    name:{
      type: String,
      required: [true, "please enter name of product"],
    },
    photo: {
      type:String,
      default:''
    }
  }
)

const Category = mongoose.models.Categorys || mongoose.model("Category", CategorySchema);

export default Category;