import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import logger from "../utils/logger.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        logger.info("Fetched all users.");
        return res.status(200).json(users);
    } catch (error) {
        logger.error(`Error fetching users: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get user details by ID
export const getUserDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        logger.info(`Fetched details for user with ID: ${id}`);
        return res.status(200).json(user);
    } catch (error) {
        logger.error(`Error fetching user details: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add new product
export const addProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const newProduct = await Product.create({ name, description, price, stock });
        logger.info(`Product added: ${name}`);
        return res.status(201).json(newProduct);
    } catch (error) {
        logger.error(`Error adding product: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;

        await product.save();
        logger.info(`Product updated: ${id}`);
        return res.status(200).json(product);
    } catch (error) {
        logger.error(`Error updating product: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        logger.info(`Product deleted: ${id}`);
        return res.status(204).json({ message: "Product deleted" });
    } catch (error) {
        logger.error(`Error deleting product: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        logger.info("Fetched all orders.");
        return res.status(200).json(orders);
    } catch (error) {
        logger.error(`Error fetching orders: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        logger.info(`Order status updated: ${id}`);
        return res.status(200).json(order);
    } catch (error) {
        logger.error(`Error updating order status: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
