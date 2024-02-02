const { appConfig } = require("../../configs/appConfig");
const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger, checkExistingUser, sendOTP } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    logger(`MIDDLEWARES / VERIFYJWT - Inside verify JWT`);
    const token = req.headers?.authorization?.split(" ")[1];
    const decodedData = jwt.verify(token, appConfig.jwtSecret);
    logger(`MIDDLEWARES / VERIFYJWT - JWT verified`);
    const existingUser = await checkExistingUser(decodedData?.email);
    // existingUser.email = "testuser@email.com";
    if (decodedData?.email !== existingUser?.email) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.PLEASE_SIGN_IN,
        statusCodeConstant.UNAUTHORIZED
      );
      logger(
        `MIDDLEWARES / VERIFYJWT - Decoded JWT email does not match with existing user email`
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    if (!existingUser.isVerified) {
      logger(`MIDDLEWARES / VERIFYJWT - User email is not verified`);
      const otpSent = await sendOTP(existingUser.email);

      if (!otpSent) {
        const generatedResponse = responseBuilder(
          {},
          responseConstant.UNABLE_TO_SEND_OTP,
          statusCodeConstant.ERROR
        );
        logger(`MIDDLEWARES / VERIFYJWT - Error while sending OTP`);
        return res.status(generatedResponse.code).send(generatedResponse);
      }
      logger(`MIDDLEWARES / VERIFYJWT - OTP sent successfully`);
      const generatedResponse = responseBuilder(
        {},
        responseConstant.OTP_NOT_VERIFIED,
        statusCodeConstant.UNAUTHORIZED
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    } else {
      logger(`MIDDLEWARES / VERIFYJWT - User is verified`);
      req.body["email"] = decodedData?.email;
      // req.body["email"] = "testuser@email.com";
      next();
    }
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.TOKEN_INVALID,
      statusCodeConstant.UNAUTHORIZED
    );
    logger(
      `MIDDLEWARES / VERIFYJWT - Error while verifying JWT \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyJWT };
