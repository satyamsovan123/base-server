const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { UpdateDataValidator } = require("../validators");

const verifyUpdateDataRequest = async (req, res, next) => {
  try {
    const userData = req.body;

    const dataValidationResult = await new UpdateDataValidator(
      userData
    ).getValidationResult();
    logger(dataValidationResult);
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
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyUpdateDataRequest };
