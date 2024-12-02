import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js"; // Import routes
import adminRoutes from "./src/routes/adminRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import sequelize from "./src/config/db.js"; // Sequelize connection setup
import requestLogger from "./src/middleware/requestLogger.js";

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON body 
app.use(requestLogger)

// Sync Sequelize models with the database
sequelize.sync({ alter: true })
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Database sync error:", err));


// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)



// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
