import express  from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addProduct } from "../controllers/product.js";

const router = express.Router();

router.post("/add-product",protect,addProduct)

export default router;