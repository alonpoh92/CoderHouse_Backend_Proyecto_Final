const pinoLogger = require('../../../utils/logger.utils');

const logger = (validRoute = true) => {
    return (req, res, next) => {
        if(validRoute){
            pinoLogger.info(`${req.url} -> ${req.method}`);
        }else{
            pinoLogger.warn(`${req.baseUrl} -> ${req.method}`);
        }
        next();
    };
};

module.exports = logger;