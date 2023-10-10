import mongoose from "mongoose";

const ProductSchema = mongoose.Schema (
  {
    sku:{
      type:String,
      default:"",
    },
    name:{
      type: String,
      required: [true, "please enter name of product"],
    },
    description:{
      type: String,
      required: [true, "please enter description of product"],
    },
    price:{
      type: Number,
      required: [true, "please enter price of product"],
    },
    category:{
      type: String,
      required: [true, "please enter category of product"],
    },
    Availability:{
      type:String,
      default:"available",
      enum:["sold","available"],
    },
    model:{
      type: String,
      default:"",
    },
    amount:{
      type: Number,
      default:"",
    },
    status:{
      type: String,
      default:"available",
      enum:["sold","available","2 or 3 days"],
    },
    sizes:{
      type: Array,
      default:"",
    }, 
    color:{
      type: Array,
      default:"",
    },
    onSale:{
      type: String,
      default:"",
    },
    priceDrop:{
      type: Number,
      default:"",
    },
    feature:{
      type: String,
      default:"",
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],  
  },
  { timestamps: true }
)


const Product = mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;