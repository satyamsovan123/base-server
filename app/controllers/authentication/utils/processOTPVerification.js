const { logger } = require("../../../../utils/logger");
const { responseBuilder } = require("../../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../../constants");
const { verifyOTP } = require("../../../../utils");
const { User } = require("../../../models");

const processOTPVerification = async (req, res) => {
  try {
    logger(`CONTROLLERS / PROCESSOTPVERIFICATION - Inside process OTP`);
    const userData = req.body;
    logger(`CONTROLLERS / PROCESSOTPVERIFICATION - User - ${userData.email}`);

    const otpVerified = await verifyOTP(userData.email, userData.otp);

    if (!otpVerified) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.OTP_NOT_VERIFIED,
        statusCodeConstant.INVALID
      );
      logger(`CONTROLLERS / PROCESSOTPVERIFICATION - OTP is wrong or expired`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: userData.email },
      { isVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.UNABLE_TO_VERIFY_OTP,
        statusCodeConstant.ERROR
      );
      logger(
        `CONTROLLERS / PROCESSOTPVERIFICATION - Error while updating user - ${userData.email}`
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(
      `CONTROLLERS / PROCESSOTPVERIFICATION - User email verified with OTP successfully and user updated`
    );

    const generatedResponse = responseBuilder(
      {},
      responseConstant.OTP_VERIFIED,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.UNABLE_TO_VERIFY_OTP,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / PROCESSOTPVERIFICATION - Error while verifying / processing OTP - ${userData.email} \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { processOTPVerification };
