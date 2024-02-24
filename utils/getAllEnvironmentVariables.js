/**
 * @fileoverview This file contains the function to get all the environment variables
 * @module utils/getAllEnvironmentVariables
 */
require("dotenv").config();
const { logger } = require("./logger");

const requiredVariables = [
  { BCRYPT_SALT_ROUNDS: "bcryptSaltRounds" },
  { JWT_EXPIRES_IN: "jwtExpiresIn" },
  { JWT_SECRET: "jwtSecret" },
  { DATABASE_NAME: "databaseName" },
  { DATABASE_URL: "databaseURL" },
  { BACKEND_URL: "backendURL" },
  { PORT: "port" },
  { NODE_ENV: "nodeEnv" },
  { APP_NAME: "appName" },
  { VERSION: "version" },
  { FRONTEND_URL: "frontendURL" },
  { EXPIRES_AFTER_MINUTES: "expiresAfterMinutes" },
  { EMAIL_SERVER_API_KEY: "emailServerAPIKey" },
  { EMAIL_SERVER_URL: "emailServerURL" },
  { REGISTERED_EMAIL: "registeredEmail" },
  { TEST_EMAIL: "testEmail" },
  { USE_SCHEDULER: "useScheduler" },
  { CRON_JOB_FREQUENCY: "cronJobFrequency" },
  { USE_RATE_LIMITER: "useRateLimiter" },
  { REQUESTS_PER_MINUTE: "requestsPerMinute" },
  { CLOUD_STORAGE_NAME: "cloudStorageName" },
  { FIREBASE_API_KEY: "firebaseAPIKey" },
  { FIREBASE_AUTH_DOMAIN: "firebaseAuthDomain" },
  { FIREBASE_PROJECT_ID: "firebaseProjectID" },
  { FIREBASE_STORAGE_BUCKET: "firebaseStorageBucket" },
  { FIREBASE_MESSAGING_SENDER_ID: "firebaseMessagingSenderID" },
  { FIREBASE_APP_ID: "firebaseAppID" },
  { FIREBASE_DOCUMENT_BUCKET_NAME: "firebaseDocumentBucketName" },
  { TEXTRAZOR_API_KEY: "textrazorAPIKey" },
  { PROFANITY_CHECKER_URL: "profanityCheckerURL" },
  { PROFANITY_CHECKER_API_KEY: "profanityCheckerAPIKey" },
];

/**
 * This function gets all the environment variables
 * @returns {object} environmentVariables - All environment variables
 * @example
 * const environmentVariables = getAllEnvironmentVariables();
 * console.log(environmentVariables); // { PORT: '3000', NODE_ENV: 'development'}
 */
const getAllEnvironmentVariables = () => {
  logger(
    `INFO`,
    `UTILS / GET_ALL_ENVIRONMENT_VARIABLES - Inside get all environment variables`
  );
  let environmentVariables = {};
  try {
    requiredVariables.forEach((variable) => {
      const requiredVariablesKey = Object.keys(variable)[0];
      environmentVariables[requiredVariablesKey] =
        process.env[requiredVariablesKey];
    });
  } catch (error) {
    environmentVariables = {}; // If error occurs then assign empty object to environmentVariables
  }
  return environmentVariables;
};

module.exports = { getAllEnvironmentVariables };
