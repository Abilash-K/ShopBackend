import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { STATUS_CODES } from "../utils/statusCodes.js"; // Import status codes

dotenv.config();

export const verifyAdmin = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res
            .status(STATUS_CODES.FORBIDDEN)
            .json({ message: "Access Denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res
                .status(STATUS_CODES.FORBIDDEN)
                .json({ message: "Access Denied: Admin Only" });
        }

        req.user = decoded; // Attach decoded user info to the request
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        return res
            .status(STATUS_CODES.UNAUTHORIZED)
            .json({ message: "Invalid or Expired Token" });
    }
};
