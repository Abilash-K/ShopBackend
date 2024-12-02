import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import { STATUS_CODES } from "../utils/statusCodes.js"; // Import status codes

// User login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(STATUS_CODES.SUCCESS).json({ message: "User login successful", token });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};

// Admin login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Email and password are required" });
    }

    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(STATUS_CODES.SUCCESS).json({ message: "Admin login successful", token });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};
