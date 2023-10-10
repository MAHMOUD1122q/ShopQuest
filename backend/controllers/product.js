import asyncHandler from "express-async-handler";
import Product from "../models/product.js"

export const addProduct = asyncHandler(async (req,res) => {
  const {
    name,
    description,
    price,
    category,
    Availability,
    model,
    amount,
    status,
    sizes,
    color,
    onSale,
    priceDrop,
    feature,
    sku,
    firstImg,
    secondImg,
    thirdImg,
    forthImg
  } = req.body;

  if(!name || !description || !price || !category|| !firstImg|| !price|| !price) {
    res.json({
      success: false,
      message: "please fill required fields",
    })
  } 
  const product = await Product.create({
    name,
    description,
    price,
    category,
    Availability,
    model,
    amount,
    status,
    sizes,
    color,
    onSale,
    priceDrop,
    feature,
    sku,
    firstImg,
    secondImg,
    thirdImg,
    forthImg
  })
  if (product) {
    res.json({
      success:true,
      massage:"the product has been created"
    })
  }
  if (product) {
    res.json({
      name,
      description,
      price,
      category,
      Availability,
      model,
      amount,
      status,
      sizes,
      color,
      onSale,
      priceDrop,
      feature,
      sku,
      firstImg,
      secondImg,
      thirdImg,
      forthImg
    })
  }
})