import express  from "express";
import { getLoginStatus, getUser, login, logout, register, updateUser } from "../controllers/auth.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/getUser", protect ,getUser)
router.get("/getLoginStatus", getLoginStatus)

router.patch("/updateUser",protect,updateUser)

export default router;