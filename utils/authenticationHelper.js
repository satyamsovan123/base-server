const { appConfig } = require("../configs/appConfig");
const { serverConstant } = require("../constants/serverConstant");
const { logger } = require("./logger");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { statusCodeConstant } = require("../constants");
const { excryptPlainText } = require("./encryptionDecryption");

const generateJWT = async (data) => {
  logger(`INFO`, `UTILS / GENERATEJWT - Inside generate JWT`);
  if (!data) {
    return "";
  }
  try {
    const token = jwt.sign(data, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiresIn,
    });

    logger(
      `INFO`,
      `UTILS / GENERATEJWT - JWT generated for ${JSON.stringify(data)}`
    );
    return token;
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / GENERATEJWT - Error while generating JWT \n Error - ${error}`
    );
    return "";
  }
};

const sendOTP = async (email) => {
  logger(`INFO`, `UTILS / SENDOTP - Inside send OTP`);
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
    logger(
      `INFO`,
      `UTILS / SENDOTP - Email details - ${JSON.stringify(postData)}`
    );
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `INFO`,
      `UTILS / SENDOTP - Response from email server - ${JSON.stringify(
        response.data
      )}`
    );

    return response.data.code === statusCodeConstant.SUCCESS;
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / SENDOTP - Error while sending OTP \n Error - ${error}`
    );
    return false;
  }
};

const verifyOTP = async (email, otp) => {
  try {
    logger(`INFO`, `UTILS / VERIFYOTP - Inside verify OTP`);
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
    logger(
      `INFO`,
      `UTILS / VERIFYOTP - Email details - ${JSON.stringify(postData)}`
    );
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `INFO`,
      `UTILS / VERIFYOTP - Response from email server - ${JSON.stringify(
        response.data
      )}`
    );
    return response.data.code === statusCodeConstant.SUCCESS;
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / VERIFYOTP - Error while verifying OTP \n Error - ${error}`
    );
    return false;
  }
};

module.exports = {
  generateJWT,
  sendOTP,
  verifyOTP,
};
