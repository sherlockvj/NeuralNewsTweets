import express from "express";
import { login, register, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify-otp", verifyOtp);

export default router;
