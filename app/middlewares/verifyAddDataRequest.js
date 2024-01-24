const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const {
  checkExistingData,
} = require("../controllers/data/utils/dataManipulationHelper");
const { AddDataValidator } = require("../validators");

const verifyAddDataRequest = async (req, res, next) => {
  try {
    const userData = req.body;

    const dataValidationResult = await new AddDataValidator(
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

    const existingData = await checkExistingData(
      userData.title,
      userData.email
    );
    if (existingData) {
      logger("Inside addData and data exists");
      const generatedResponse = responseBuilder(
        {},
        responseConstant.DATA_ALREADY_EXISTS,
        statusCodeConstant.ALREADY_EXISTS
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

module.exports = { verifyAddDataRequest };
