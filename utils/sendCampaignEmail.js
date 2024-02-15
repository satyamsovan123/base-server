const { appConfig } = require("../configs/appConfig");
const { serverConstant } = require("../constants/serverConstant");
const { logger } = require("./logger");
const axios = require("axios");
const { statusCodeConstant } = require("../constants");

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
    const apiUrl = `${appConfig.emailServer}${serverConstant.SEND_CAMPAIGN_EMAIL}`;
    logger(
      `INFO`,
      `UTILS / SENDEMAILCAMPAIGN - Email details - ${JSON.stringify(postData)}`
    );
    const response = await axios.post(apiUrl, postData, { headers });
    logger(
      `INFO`,
      `UTILS / SENDEMAILCAMPAIGN - Response from email server - ${JSON.stringify(
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
