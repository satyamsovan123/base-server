const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger, redactSensitiveInformation } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { UpdateDataValidator } = require("../validators");

const verifyUpdateDataRequest = async (req, res, next) => {
  try {
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYUPDATEDATAREQUEST - Inside verify update data request`
    );
    const userData = req.body;
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYUPDATEDATAREQUEST - Request body - ${redactSensitiveInformation(
        req.body
      )}`
    );
    const dataValidationResult = await new UpdateDataValidator(
      userData
    ).getValidationResult();
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYUPDATEDATAREQUEST - Data validation result - ${
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
      `MIDDLEWARES / VERIFYJWT - Error while verifying update data request \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyUpdateDataRequest };
