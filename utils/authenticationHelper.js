const { logger } = require("./logger");
const jwt = require("jsonwebtoken");

const generateJWT = async (data) => {
  if (!data) {
    return "";
  }
  try {
    const token = jwt.sign(data, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiresIn,
    });
    logger(["JWT generated", token]);
    return token;
  } catch (error) {
    logger(["UTIL: Error while generating JWT", error]);
    return "";
  }
};

const sendOTP = async (email) => {};

module.exports = {
  generateJWT,
  sendOTP,
};
