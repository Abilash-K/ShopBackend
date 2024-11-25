import express from "express";
import { userLogin, adminLogin } from "../controllers/authController.js";

const router = express.Router();

// User login endpoint
router.post("/user/login", userLogin);

// Admin login endpoint
router.post("/admin/login", adminLogin);

export default router;
