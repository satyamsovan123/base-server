const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { checkExistingData } = require("../../utils");
const { ProcessOTPVerificationValidator } = require("../validators");

const verifyProcessOTPVerificationRequest = async (req, res, next) => {
  logger(
    `INFO`,
    `MIDDLEWARES / VERIFYPROCESSOTPREQUEST - Inside verify process OTP request`
  );
  try {
    const userData = req.body;
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYPROCESSOTPREQUEST - Request body - ${JSON.stringify(
        userData
      )}`
    );
    const dataValidationResult = await new ProcessOTPVerificationValidator(
      userData
    ).getValidationResult();
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYPROCESSOTPREQUEST - Data validation result - ${
        dataValidationResult || null
      }`
    );
    if (dataValidationResult) {
      const generatedResponse = responseBuilder(
        {},
        dataValidationResult,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.ERROR_OCCURRED_WHILE_VERIFYING,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `MIDDLEWARES / VERIFYPROCESSOTPREQUEST - Error while verifying add data request \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyProcessOTPVerificationRequest };
