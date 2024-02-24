/**
 * @fileoverview This file contains the function to start the server
 * @module utils/startServer
 */
const { logger } = require("./logger");
const { connectToDB } = require("./database");
const { runScheduler } = require("./runScheduler");
const { getServerDetails } = require("./getServerDetails");
const { overengineedBoxifier } = require("./overengineedBoxifier");

/**
 * This function starts the server by connecting to the database, getting the server details and running the scheduler
 * @returns {void}
 * @async
 * @example
 * await startServer();
 */
const startServer = async () => {
  logger(`INFO`, `UTILS / START_SERVER - Inside start server`);
  try {
    const dbConnectionResult = await connectToDB(); // Connect to the database
    if (!dbConnectionResult) {
      process.exit(1);
    }
    const serverDetails = await getServerDetails(); // Get the server details
    if (!serverDetails) {
      process.exit(1);
    }
    overengineedBoxifier(serverDetails); // Display the server details in a box
    runScheduler(); // Even though this function is async, it is not awaited because it is a scheduler and runs in the background
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / START_SERVER - Error while starting server \n Error - ${error}`
    );
  }
};

module.exports = {
  startServer,
};
