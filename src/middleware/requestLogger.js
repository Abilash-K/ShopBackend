import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
};

export default requestLogger;