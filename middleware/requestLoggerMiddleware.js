const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
  const startTime = new Date();
  
  res.on('finish', () => {
    const duration = new Date() - startTime;
    const logMessage = `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - ${req.ip}`;
    
    if (res.statusCode >= 500) {
      logger.error(logMessage);
    } else if (res.statusCode >= 400) {
      logger.warn(logMessage);
    } else {
      logger.info(logMessage);
    }
  });
  
  next();
};

module.exports = requestLogger; 