const logger = require('./logger.utils');

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

const errorResponse = (message, details = null) => {
  return {
    success: false,
    message,
    details
  }
}

class HttpError {
  constructor(status, message, details) {
    this.statusCode = status;
    this.message = message;
    this.details = details;
    logger.error(message);
  }
}

module.exports = {
  successResponse,
  errorResponse,
  HttpError
}