const { appConfig } = require("../../../configs/appConfig");
const { serverConstant, statusCodeConstant } = require("../../../constants");

const { logger } = require("../../../utils/logger");
const axios = require("axios");
const {
  redactSensitiveInformation,
} = require("../../../utils/redactSensitiveInformation");

const sendCampaignEmail = async (email, emailBody) => {
  try {
    logger(`INFO`, `UTILS / SENDEMAILCAMPAIGN - Inside send email campaign`);
    const postData = {
      sender: appConfig.emailServerUsername,
      receiver: email,
      appName: appConfig.appName,
      emailBody: emailBody,
    };
    const headers = {
      "email-server-api-key": appConfig.emailServerAPIKey,
    };
    const apiUrl = `${appConfig.emailServerURL}${serverConstant.SEND_CAMPAIGN_EMAIL}`;
    logger(
      `INFO`,
      `UTILS / SENDEMAILCAMPAIGN - Email details - ${redactSensitiveInformation(
        postData
      )}`
    );
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `INFO`,
      `UTILS / SENDEMAILCAMPAIGN - Response from email server - ${redactSensitiveInformation(
        response.data
      )}`
    );

    return response.data.code === statusCodeConstant.SUCCESS;
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / SENDEMAILCAMPAIGN - Error while sending campaign email \n Error - ${error}`
    );
    return false;
  }
};

module.exports = {
  sendCampaignEmail,
};
