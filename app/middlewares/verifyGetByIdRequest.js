const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");

const { GetByIdValidator } = require("../validators");

const verifyGetByIdRequest = async (req, res, next) => {
  try {
    logger(`MIDDLEWARES / GETBYIDREQUEST - Inside verify get by id request`);
    const userData = req.body;
    logger(
      `MIDDLEWARES / GETBYIDREQUEST - Request body - ${JSON.stringify(
        userData
      )}`
    );
    const dataValidationResult = await new GetByIdValidator(
      userData
    ).getValidationResult();
    logger(
      `MIDDLEWARES / GETBYIDREQUEST - Data validation result - ${
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
      `MIDDLEWARERS / GETBYIDREQUEST - Error while verifying get by id request \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyGetByIdRequest };
