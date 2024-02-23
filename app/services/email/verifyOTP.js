const { serverConstant, statusCodeConstant } = require("../../../constants");
const {
  redactSensitiveInformation,
} = require("../../../utils/redactSensitiveInformation");

const axios = require("axios");
const { appConfig } = require("../../../configs/appConfig");
const { logger } = require("../../../utils");

const verifyOTP = async (email, otp) => {
  try {
    logger(`INFO`, `SERVICES / VERIFYOTP - Inside verify OTP`);
    const postData = {
      sender: appConfig.emailServerUsername,
      receiver: email,
      appName: appConfig.appName,
      otp: otp,
    };
    const headers = {
      "email-server-api-key": appConfig.emailServerAPIKey,
    };
    const apiUrl = `${appConfig.emailServerURL}${serverConstant.VERIFY_OTP}`;
    logger(
      `INFO`,
      `SERVICES / VERIFYOTP - Email details - ${redactSensitiveInformation(
        postData
      )}`
    );
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `INFO`,
      `SERVICES / VERIFYOTP - Response from email server - ${redactSensitiveInformation(
        response.data
      )}`
    );
    return response.data.code === statusCodeConstant.SUCCESS;
  } catch (error) {
    logger(
      `ERROR`,
      `SERVICES / VERIFYOTP - Error while verifying OTP \n Error - ${error}`
    );
    return false;
  }
};

module.exports = {
  verifyOTP,
};
