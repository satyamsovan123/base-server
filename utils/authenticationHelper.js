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
    return token;
  } catch (error) {
    logger(error);
    return "";
  }
};

module.exports = {
  generateJWT,
};
