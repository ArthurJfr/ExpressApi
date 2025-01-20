const { writeLog } = require("../logfunc");

const requestLogger = (req, res, next) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const method = req.method;
    const url = `${protocol}://${host}${req.originalUrl}`;
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];

    const logMessage = `METHOD: ${method} | URL: ${url} | IP: ${ip} | USER-AGENT: ${userAgent}`;
    
    writeLog("requests.log", logMessage);
    
    next();
};

module.exports = requestLogger; 