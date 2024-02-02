const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { checkExistingData } = require("../../utils");
const { ProcessOTPValidator } = require("../validators");

const verifyProcessOTPRequest = async (req, res, next) => {
  logger(
    `MIDDLEWARES / VERIFYPROCESSOTPREQUEST - Inside verify process OTP request`
  );
  try {
    const userData = req.body;
    logger(
      `MIDDLEWARES / VERIFYPROCESSOTPREQUEST - Request body - ${JSON.stringify(
        userData
      )}`
    );
    const dataValidationResult = await new ProcessOTPValidator(
      userData
    ).getValidationResult();
    logger(
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
      `MIDDLEWARES / VERIFYPROCESSOTPREQUEST - Error while verifying add data request \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyProcessOTPRequest };