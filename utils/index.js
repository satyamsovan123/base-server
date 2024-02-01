const { logger } = require("./logger");
const { overengineedBoxifier } = require("./overengineedBoxifier");
const { generateJWT, sendOTP, verifyOTP } = require("./authenticationHelper");
const {
  checkExistingData,
  checkExistingUser,
} = require("./checkExistingDataInDatabase");

const {
  compareEncryptedText,
  excryptPlainText,
} = require("./encryptionDecryption");

const { checkDBConnection } = require("./database");

module.exports = {
  logger,
  overengineedBoxifier,
  compareEncryptedText,
  excryptPlainText,
  generateJWT,
  checkExistingData,
  checkExistingUser,
  sendOTP,
  verifyOTP,
  checkDBConnection,
};
