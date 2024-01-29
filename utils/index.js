const { logger } = require("./logger");
const { overengineedBoxifier } = require("./overengineedBoxifier");
const { generateJWT, sendOTP } = require("./authenticationHelper");
const {
  checkExistingData,
  checkExistingUser,
} = require("./checkExistingDataInDatabase");

const {
  compareEncryptedText,
  excryptPlainText,
} = require("./encryptionDecryption");

module.exports = {
  logger,
  overengineedBoxifier,
  compareEncryptedText,
  excryptPlainText,
  generateJWT,
  checkExistingData,
  checkExistingUser,
  sendOTP,
};
