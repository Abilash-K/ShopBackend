import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js"; // Import routes
import sequelize from "./src/config/db.js"; // Sequelize connection setup

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON body

// Sync Sequelize models with the database
sequelize.sync({ alter: true })
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Database sync error:", err));

// Routes
app.use("/api/auth", authRoutes); // Use the auth routes for login

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
