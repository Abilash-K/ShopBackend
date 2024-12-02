import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

// Setup the database connection
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // Database username
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST,       // Host where your DB is located
        dialect: process.env.DB_DIALECT, // Specify dialect explicitly (PostgreSQL in this case)
        logging: (msg) => logger.info(`SQL: ${msg}`), // Log queries
    }
);

export default sequelize;
