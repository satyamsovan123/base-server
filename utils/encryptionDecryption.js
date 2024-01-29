const bcrypt = require("bcrypt");
const { appConfig } = require("../configs/appConfig");
const { logger } = require("./logger");
const saltRounds = Number(appConfig.saltRounds);

const compareEncryptedText = async (plainText, hash) => {
  if (!plainText || !hash) {
    return false;
  }
  try {
    const result = await bcrypt.compare(plainText, hash);
    return result;
  } catch (error) {
    logger(["Error while comparing encrypted text", error]);
    return false;
  }
};

const excryptPlainText = async (plainText) => {
  if (!plainText) {
    return "";
  }
  try {
    const encryptedText = await bcrypt.hash(plainText, saltRounds);
    return encryptedText;
  } catch (error) {
    logger(["UTIL: Error while encrypting plain text", error]);
    return "";
  }
};

module.exports = { compareEncryptedText, excryptPlainText };
