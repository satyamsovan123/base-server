const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger, checkExistingUser } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { AuthenticationValidator } = require("../validators");

const verifyAuthenticationDataRequest = async (req, res, next) => {
  try {
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - Inside verify authentication request`
    );
    const userData = req.body;
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - User - ${userData.email}`
    );
    const currentPath = req.path.split("/")[1];
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - Current path - ${currentPath}`
    );
    const dataValidationResult = await new AuthenticationValidator(
      userData
    ).getValidationResult();
    logger(
      `INFO`,
      `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - Data validation result - ${
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

    const existingUser = await checkExistingUser(userData.email);
    if (existingUser && currentPath === "signup") {
      logger(
        `INFO`,
        `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - Inside signup and user already exists`
      );
      const generatedResponse = responseBuilder(
        {},
        responseConstant.USER_ALREADY_EXISTS,
        statusCodeConstant.ALREADY_EXISTS
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    } else if (!existingUser && currentPath === "signin") {
      logger(
        `INFO`,
        `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - Inside signin and user does not exist`
      );
      const generatedResponse = responseBuilder(
        {},
        responseConstant.USER_NOT_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    } else if (existingUser && currentPath === "signin") {
      logger(
        `INFO`,
        `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - Inside signin and user exists`
      );
      req.body["hashedPassword"] = existingUser.password;
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
      `MIDDLEWARES / VERIFYAUTHENTICATIONREQUEST - Error while verifying authentication request \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyAuthenticationDataRequest };
