import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routers/auth.js'
import cors from "cors"
import cookieParser from 'cookie-parser'
import ProductRouter from "./routers/product.js"

dotenv.config();

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/product',ProductRouter)


mongoose.connect(process.env.MONGO) 
.then(()=>{
  console.log('connected to database')
}
).catch((err) =>{
  console.log(err)
})


app.listen(3002,()=>{
  console.log('the server is created on port 3002')
})