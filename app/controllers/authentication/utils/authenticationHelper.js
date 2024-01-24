const { logger } = require("../../../../utils");
const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const saltRounds = Number(appConfig.saltRounds);
const jwt = require("jsonwebtoken");

const checkExistingUser = async (email) => {
  let cursorData = null;
  if (!email) {
    return cursorData;
  }
  await User.findOne({ email: email })
    .select("email password")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

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
  checkExistingUser,
  generateJWT,
};
