const bcrypt = require("bcrypt");
const { appConfig } = require("../configs/appConfig");
const { logger } = require("./logger");
const saltRounds = Number(appConfig.saltRounds);

const compareEncryptedText = async (plainText, hash) => {
  logger(
    `INFO`,
    `UTILS / COMPAREENCRYPTEDTEXT - Inside compare encrypted text`
  );
  if (!plainText || !hash) {
    logger(
      `INFO`,
      `UTILS / COMPAREENCRYPTEDTEXT - Plain text or hash not provided`
    );
    return false;
  }
  try {
    const result = await bcrypt.compare(plainText, hash);
    return result;
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / COMPAREENCRYPTEDTEXT - Error while comparing encrypted text \n Error - ${error}`
    );
    return false;
  }
};

const excryptPlainText = async (plainText) => {
  logger(`INFO`, `UTILS / ENCRPYPTPLAINTEXT - Inside encrypt plain text`);
  if (!plainText) {
    logger(`INFO`, `UTILS / ENCRPYPTPLAINTEXT - Plain text not provided`);
    return "";
  }
  try {
    const encryptedText = await bcrypt.hash(plainText, saltRounds);
    return encryptedText;
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / ENCRPYPTPLAINTEXT - Error while encrypting plain text \n Error - ${error}`
    );
    return "";
  }
};

module.exports = { compareEncryptedText, excryptPlainText };
