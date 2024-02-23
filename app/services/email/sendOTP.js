const { serverConstant, statusCodeConstant } = require("../../../constants");

const {
  redactSensitiveInformation,
} = require("../../../utils/redactSensitiveInformation");

const axios = require("axios");
const { appConfig } = require("../../../configs/appConfig");
const { logger } = require("../../../utils");

const sendOTP = async (email) => {
  logger(`INFO`, `SERVICES / SENDOTP - Inside send OTP email`);
  try {
    const postData = {
      sender: appConfig.emailServerUsername,
      receiver: email,
      appName: appConfig.appName,
    };
    const headers = {
      "email-server-api-key": appConfig.emailServerAPIKey,
    };
    const apiUrl = `${appConfig.emailServerURL}${serverConstant.SEND_OTP}`;
    logger(
      `INFO`,
      `SERVICES / SENDOTP - Email details - ${redactSensitiveInformation(
        postData
      )}`
    );
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `INFO`,
      `SERVICES / SENDOTP - Response from email server - ${redactSensitiveInformation(
        response.data
      )}`
    );

    return response.data.code === statusCodeConstant.SUCCESS;
  } catch (error) {
    logger(
      `ERROR`,
      `SERVICES / SENDOTP - Error while sending OTP email \n Error - ${error}`
    );
    return false;
  }
};

module.exports = {
  sendOTP,
};
