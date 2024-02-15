const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { checkExistingData } = require("../../utils");
const { AddDataValidator } = require("../validators");

const verifyAddDataRequest = async (req, res, next) => {
  logger(
    `INFO`,
    `MIDDLEWARES / VERIFYADDDATAREQUEST - Inside verify add data request`
  );
  try {
    const userData = req.body;
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYADDDATAREQUEST - Request body - ${JSON.stringify(
        userData
      )}`
    );
    const dataValidationResult = await new AddDataValidator(
      userData
    ).getValidationResult();
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYADDDATAREQUEST - Data validation result - ${
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

    const existingData = await checkExistingData(
      userData.title,
      userData.email
    );
    if (existingData) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.DATA_ALREADY_EXISTS,
        statusCodeConstant.ALREADY_EXISTS
      );
      logger(
        `INFO`,
        `MIDDLEWARES / VERIFYADDDATAREQUEST - Data already exists`
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
      `MIDDLEWARES / VERIFYADDDATAREQUEST - Error while verifying add data request \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyAddDataRequest };
