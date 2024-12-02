import express from 'express';
import { userRegister, getUserProfile, updateUserProfile, changePassword, getUserOrders } from '../controllers/userController.js';
import { verifyUser } from '../middleware/authMiddleware.js';  // Assuming this middleware verifies the user token
import { STATUS_CODES } from '../utils/statusCodes.js'; // Status codes import

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        await userRegister(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// Get User Profile (Authenticated Route)
router.get('/profile', verifyUser, async (req, res) => {
    try {
        await getUserProfile(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// Update User Profile (Authenticated Route)
router.put('/profile', verifyUser, async (req, res) => {
    try {
        await updateUserProfile(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// Change User Password (Authenticated Route)
router.put('/password', verifyUser, async (req, res) => {
    try {
        await changePassword(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// Get All Orders (Authenticated Route)
router.get('/orders', verifyUser, async (req, res) => {
    try {
        await getUserOrders(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

export default router;
