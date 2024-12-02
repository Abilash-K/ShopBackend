import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { STATUS_CODES } from '../utils/statusCodes.js';
import logger from '../utils/logger.js'; // Logger

// User Registration
export const userRegister = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        logger.error("User registration failed: Missing required fields");
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "First name, last name, email, and password are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            logger.error(`User registration failed: Email ${email} already exists`);
            return res.status(STATUS_CODES.CONFLICT).json({ message: "Email already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ firstname, lastname, email, password: hashedPassword });

        logger.info(`New user registered: ${email}`);
        return res.status(STATUS_CODES.CREATED).json({ message: "User registered successfully", user: { id: newUser.id, firstname: newUser.firstname, lastname: newUser.lastname, email: newUser.email } });
    } catch (error) {
        logger.error(`User registration error: ${error.message}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            logger.error(`Get user profile failed: User not found with ID ${userId}`);
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
        }

        logger.info(`User profile fetched successfully: ${userId}`);
        return res.status(STATUS_CODES.SUCCESS).json(user);
    } catch (error) {
        logger.error(`Get user profile error: ${error.message}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            logger.error(`Update user profile failed: User not found with ID ${userId}`);
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        logger.info(`User profile updated: ${userId}`);
        return res.status(STATUS_CODES.SUCCESS).json({ message: "Profile updated successfully", user });
    } catch (error) {
        logger.error(`Update user profile error: ${error.message}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};

// Change User Password
export const changePassword = async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            logger.error(`Change password failed: User not found with ID ${userId}`);
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            logger.error(`Change password failed: Incorrect old password for user ${userId}`);
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Incorrect old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        logger.info(`User password changed successfully: ${userId}`);
        return res.status(STATUS_CODES.SUCCESS).json({ message: "Password changed successfully" });
    } catch (error) {
        logger.error(`Change password error: ${error.message}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.findAll({ where: { userId } });

        if (!orders || orders.length === 0) {
            logger.error(`Get user orders failed: No orders found for user ${userId}`);
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "No orders found" });
        }

        logger.info(`User orders fetched successfully: ${userId}`);
        return res.status(STATUS_CODES.SUCCESS).json({ orders });
    } catch (error) {
        logger.error(`Get user orders error: ${error.message}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};
