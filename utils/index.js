/**
 * @fileoverview Index file to export all the utility functions
 * @module utils
 * @requires utils/logger
 * @requires utils/overengineedBoxifier
 * @requires utils/authenticationHelper
 * @requires utils/checkExistingDataInDatabase
 * @requires utils/encryptionDecryption
 * @requires utils/runScheduler
 * @requires utils/redactSensitiveInformation
 * @requires utils/startServer
 * @requires utils/getAllEnvironmentVariables
 * @requires utils/database
 * @requires utils/responseBuilder
 * @requires utils/getServerDetails
 */
const { logger } = require("./logger");
const { overengineedBoxifier } = require("./overengineedBoxifier");
const { generateJWT } = require("./authenticationHelper");
const {
  checkExistingData,
  checkExistingUser,
} = require("./checkExistingDataInDatabase");

const {
  compareEncryptedText,
  excryptPlainText,
} = require("./encryptionDecryption");

const { runScheduler } = require("./runScheduler");
const { redactSensitiveInformation } = require("./redactSensitiveInformation");
const { startServer } = require("./startServer");
const { getAllEnvironmentVariables } = require("./getAllEnvironmentVariables");

module.exports = {
  logger,
  overengineedBoxifier,
  compareEncryptedText,
  excryptPlainText,
  checkExistingData,
  checkExistingUser,
  runScheduler,
  generateJWT,
  redactSensitiveInformation,
  startServer,
  getAllEnvironmentVariables,
};

// TODO: Use class based approach for utils
