const limiter = require("express-rate-limit");
const { logger } = require("../../utils");
const { responseConstant, statusCodeConstant } = require("../../constants");
const { responseBuilder } = require("../../utils/responseBuilder");
const { appConfig } = require("../../configs/appConfig");

logger(`INFO`, `MIDDLEWARES / RATELIMITER - Inside rate limiter`);
const rateLimiterConfig = {
  windowMs: 1 * 60 * 1000, // 1 minute
  max: appConfig.requestsPerMinute, // Limit each IP to 50 requests per 1 minute
  message: responseConstant.TOO_MANY_REQUESTS,
  handler: (req, res, next) => {
    if (req.rateLimit.remaining === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.TOO_MANY_REQUESTS,
        statusCodeConstant.TOO_MANY_REQUESTS
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    next();
  },
};

const rateLimiter = limiter(rateLimiterConfig);
module.exports = rateLimiter;
