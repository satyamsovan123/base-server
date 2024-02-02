const { logger } = require("../../../../utils/logger");
const { responseBuilder } = require("../../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../../constants");
const { verifyOTP } = require("../../../../utils");

const processOTP = async (req, res) => {
  try {
    logger(`CONTROLLERS / PROCESSOTP - Inside process OTP`);
    const userData = req.body;
    logger(`CONTROLLERS / PROCESSOTP - User - ${userData.email}`);

    const otpVerified = await verifyOTP(userData.email, userData.otp);

    if (!otpVerified) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.OTP_NOT_VERIFIED,
        statusCodeConstant.INVALID
      );
      logger(`CONTROLLERS / PROCESSOTP - OTP is wrong or expired`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(
      `CONTROLLERS / PROCESSOTP - User email verified with OTP successfully`
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
      `CONTROLLERS / PROCESSOTP - Error while verifying / processing OTP - ${userData.email} \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { processOTP };
