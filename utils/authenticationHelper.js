const { appConfig } = require("../configs/appConfig");
const { serverConstant } = require("../constants/serverConstant");
const { logger } = require("./logger");
const jwt = require("jsonwebtoken");
const { redactSensitiveInformation } = require("./redactSensitiveInformation");

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
      `UTILS / GENERATEJWT - JWT generated for ${redactSensitiveInformation(
        data
      )}`
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

module.exports = {
  generateJWT,
};
