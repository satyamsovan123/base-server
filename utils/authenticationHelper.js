const { appConfig } = require("../configs/appConfig");
const { serverConstant } = require("../constants/serverConstant");
const { logger } = require("./logger");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { statusCodeConstant } = require("../constants");

const generateJWT = async (data) => {
  logger(`UTILS / GENERATEJWT - Inside generate JWT`);
  if (!data) {
    return "";
  }
  try {
    const token = jwt.sign(data, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiresIn,
    });
    logger(`UTILS / GENERATEJWT - JWT generated for ${JSON.stringify(data)}`);
    return token;
  } catch (error) {
    logger(
      `UTILS / GENERATEJWT - Error while generating JWT \n Error - ${error}`
    );
    return "";
  }
};

const sendOTP = async (email) => {
  logger(`UTILS / SENDOTP - Inside send OTP`);
  try {
    const postData = {
      sender: appConfig.emailServerUsername,
      receiver: email,
      appName: appConfig.appName,
    };
    const headers = {
      "email-server-api-key": appConfig.emailServerAPIKey,
    };
    const apiUrl = `${appConfig.emailServer}${serverConstant.SEND_OTP}`;
    logger(`UTILS / SENDOTP - Email details - ${JSON.stringify(postData)}`);
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `UTILS / VERIFYOTP - Response from email server - ${JSON.stringify(
        response.data
      )}`
    );

    return response.data.code === statusCodeConstant.SUCCESS;
  } catch (error) {
    logger(`UTILS / SENDOTP - Error while sending OTP \n Error - ${error}`);
    return false;
  }
};

const verifyOTP = async (email, otp) => {
  try {
    logger(`UTILS / VERIFYOTP - Inside verify OTP`);
    const postData = {
      sender: appConfig.emailServerUsername,
      receiver: email,
      appName: appConfig.appName,
      otp: otp,
    };
    const headers = {
      "email-server-api-key": appConfig.emailServerAPIKey,
    };
    const apiUrl = `${appConfig.emailServer}${serverConstant.VERIFY_OTP}`;
    logger(`UTILS / VERIFYOTP - Email details - ${JSON.stringify(postData)}`);
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `UTILS / VERIFYOTP - Response from email server - ${JSON.stringify(
        response.data
      )}`
    );
    return response.data.code === statusCodeConstant.SUCCESS;
  } catch (error) {
    logger(`UTILS / VERIFYOTP - Error while verifying OTP \n Error - ${error}`);
    return false;
  }
};

module.exports = {
  generateJWT,
  sendOTP,
  verifyOTP,
};
