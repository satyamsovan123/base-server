/**
 * @fileoverview This file contains the function to get the server details
 * @module utils/getServerDetails
 */
const fs = require("fs").promises;
const { logger } = require("./logger");

/**
 * This function gets the server details and passes it to the overengineedBoxifier function to display it in a box
 * @returns {void}
 * @async
 * @requires fs
 * @example
 * await getServerDetails();
 */
const getServerDetails = async () => {
  logger(`INFO`, `UTILS / GET_SERVER_DETAILS - Inside get server details`);
  let serverDetails = [];
  try {
    const data = await fs.readFile("VERSION", "utf8"); // Read the version file
    const majorVersion = data.split("\n")[0].split("=")[1];
    const minorVersion = data.split("\n")[1].split("=")[1];
    appConfig.appVersion = `${majorVersion}.${minorVersion}`; // Assign the version to appConfig

    const environment = appConfig.environment;
    const port = appConfig.port;
    const databaseName = appConfig.databaseName;
    const appName = appConfig.appName;
    const frontendURL = appConfig.frontendURL;
    const backendURL = appConfig.backendURL;
    const appVersion = appConfig.appVersion;
    const useRateLimiter = appConfig.useRateLimiter;
    const cloudStorageName = appConfig.cloudStorageName;
    const useScheduler = appConfig.useScheduler;

    serverDetails = [
      // Create an array of serverDetails to be displayed in the box
      `Name - ${appName}`,
      `Status - Server is running on port ${port} in ${environment} environment.`,
      `Using database - ${databaseName}`,
      `Using cloud storage - ${cloudStorageName}`,
      `Rate limiter - ${useRateLimiter ? "Enabled" : "Disabled"}`,
      `Scheduler - ${useScheduler ? "Enabled" : "Disabled"}`,
      `Frontend URL - ${frontendURL}`,
      `Backend URL - ${backendURL}`,
      `Version - ${appVersion}`,
    ];
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / GET_SERVER_DETAILS - Error while getting server details \n Error - ${error}`
    );
    serverDetails = []; // If error occurs then assign empty array to serverDetails
  }
  return serverDetails;
};

module.exports = { getServerDetails };
