import winston from "winston";

// Create a custom format for logs
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configure Winston logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: "logs/app.log" }), // Log to file
    ],
});

// Export the logger
export default logger;
