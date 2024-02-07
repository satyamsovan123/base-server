const { logger } = require("./logger");
const { overengineedBoxifier } = require("./overengineedBoxifier");
const { sendOTP, verifyOTP, generateJWT } = require("./authenticationHelper");
const {
  checkExistingData,
  checkExistingUser,
} = require("./checkExistingDataInDatabase");

const {
  compareEncryptedText,
  excryptPlainText,
} = require("./encryptionDecryption");

const { checkDBConnection } = require("./database");
const { scheduler } = require("./scheduler");

module.exports = {
  logger,
  overengineedBoxifier,
  compareEncryptedText,
  excryptPlainText,
  checkExistingData,
  checkExistingUser,
  sendOTP,
  verifyOTP,
  checkDBConnection,
  scheduler,
  generateJWT,
};
