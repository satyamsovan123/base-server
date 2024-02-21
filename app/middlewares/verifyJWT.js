const { appConfig } = require("../../configs/appConfig");
const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger, checkExistingUser } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    logger(`INFO`, `MIDDLEWARES / VERIFYJWT - Inside verify JWT`);
    const tokenFromHeader = req.headers?.authorization?.split(" ")[1];
    const tokenFromCookies = req.cookies;
    if (tokenFromCookies) {
      logger(`INFO`, `MIDDLEWARES / VERIFYJWT - Token from cookies`);
    }
    if (tokenFromHeader) {
      logger(`INFO`, `MIDDLEWARES / VERIFYJWT - Token from header`);
    }
    const token = tokenFromHeader || tokenFromCookies;

    const decodedData = jwt.verify(token, appConfig.jwtSecret);
    logger(`INFO`, `MIDDLEWARES / VERIFYJWT - JWT verified`);
    const existingUser = await checkExistingUser(decodedData?.email);
    // existingUser.email = "testuser@email.com";
    if (decodedData?.email !== existingUser?.email) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.PLEASE_SIGN_IN,
        statusCodeConstant.UNAUTHORIZED
      );
      logger(
        `INFO`,
        `MIDDLEWARES / VERIFYJWT - Decoded JWT email does not match with existing user email`
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(`INFO`, `MIDDLEWARES / VERIFYJWT - User is verified`);
    req.body["email"] = decodedData?.email;
    req.body["isVerified"] = existingUser?.isVerified;

    // req.body["email"] = "testuser@email.com";
    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.TOKEN_INVALID,
      statusCodeConstant.UNAUTHORIZED
    );
    logger(
      `ERROR`,
      `MIDDLEWARES / VERIFYJWT - Error while verifying JWT \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyJWT };
