import express from "express";
import {
    getAllUsers,
    getUserDetails,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
} from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes for managing users
router.get("/users", verifyAdmin, getAllUsers); // Get all users
router.get("/users/:id", verifyAdmin, getUserDetails); // Get user details

// Admin routes for managing products
router.post("/products", verifyAdmin, addProduct); // Add new product
router.put("/products/:id", verifyAdmin, updateProduct); // Update product
router.delete("/products/:id", verifyAdmin, deleteProduct); // Delete product

// Admin routes for managing orders
router.get("/orders", verifyAdmin, getAllOrders); // Get all orders
router.put("/orders/:id", verifyAdmin, updateOrderStatus); // Update order stat

export default router;
