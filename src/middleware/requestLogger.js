import logger from "../utils/logger.js";
import fs from 'fs';
import path from 'path';

const requestLogger = (req, res, next) => {
    const { method, originalUrl, body, query, params } = req;
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${method} ${originalUrl} - Body: ${JSON.stringify(body)} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(params)}\n`;
    
    logger.info(`Incoming request: ${logMessage}`);
    
    next(); // Pass control to the next middleware
};

export default requestLogger;

