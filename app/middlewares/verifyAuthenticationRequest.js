const {
  responseConstant,
  statusCodeConstant,
  serverConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const {
  checkExistingUser,
} = require("../controllers/authentication/utils/authenticationHelper");
const { AuthenticationValidator } = require("../validators");

const verifyAuthenticationDataRequest = async (req, res, next) => {
  try {
    const userData = req.body;
    const currentPath = req.path.split("/")[1];

    const dataValidationResult = await new AuthenticationValidator(
      userData
    ).getValidationResult();
    if (dataValidationResult) {
      const generatedResponse = responseBuilder(
        {},
        dataValidationResult,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const existingUser = await checkExistingUser(userData.email);
    if (existingUser && currentPath === "signup") {
      logger("Inside signup and user exists");
      const generatedResponse = responseBuilder(
        {},
        responseConstant.USER_ALREADY_EXISTS,
        statusCodeConstant.ALREADY_EXISTS
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    } else if (!existingUser && currentPath === "signin") {
      logger("Inside signin and user does not exist");
      const generatedResponse = responseBuilder(
        {},
        responseConstant.USER_NOT_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    } else if (existingUser && currentPath === "signin") {
      logger("Inside signin and user exist");
      req.body["hashedPassword"] = existingUser.password;
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

module.exports = { verifyAuthenticationDataRequest };
