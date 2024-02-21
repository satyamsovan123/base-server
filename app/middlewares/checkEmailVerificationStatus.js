const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger, redactSensitiveInformation } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { sendOTP } = require("../services");

const checkEmailVerificationStatus = async (req, res, next) => {
  logger(
    `INFO`,
    `MIDDLEWARES / CHECKEMAILVERIFICATIONSTATUS - Inside check email verification status`
  );
  try {
    const userData = req.body;
    logger(
      `INFO`,
      `MIDDLEWARES / CHECKEMAILVERIFICATIONSTATUS - Request body - ${redactSensitiveInformation(
        userData
      )}`
    );

    if (!userData.isVerified) {
      logger(
        `INFO`,
        `MIDDLEWARES / CHECKEMAILVERIFICATIONSTATUS - User email is not verified`
      );
      const otpSent = await sendOTP(userData.email);

      if (!otpSent) {
        const generatedResponse = responseBuilder(
          {},
          responseConstant.UNABLE_TO_SEND_OTP,
          statusCodeConstant.ERROR
        );
        logger(
          `INFO`,
          `MIDDLEWARES / CHECKEMAILVERIFICATIONSTATUS - Error while sending OTP`
        );
        return res.status(generatedResponse.code).send(generatedResponse);
      }
      logger(
        `INFO`,
        `MIDDLEWARES / CHECKEMAILVERIFICATIONSTATUS - OTP sent successfully`
      );
      const generatedResponse = responseBuilder(
        {},
        responseConstant.OTP_NOT_VERIFIED,
        statusCodeConstant.UNAUTHORIZED
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(
      `INFO`,
      `MIDDLEWARES / CHECKEMAILVERIFICATIONSTATUS - User email is verified`
    );

    delete req.body.isVerified;
    req.body.email = userData.email;

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.ERROR_OCCURRED_WHILE_VERIFYING,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `MIDDLEWARES / CHECKEMAILVERIFICATIONSTATUS - Error while checking email verification status \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { checkEmailVerificationStatus };
