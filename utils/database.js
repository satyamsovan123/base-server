/**
 * @fileoverview This file contains the functions to connect and disconnect from the database
 * @module utils/database
 */
const mongoose = require("mongoose");
const { logger } = require("./logger");

/**
 * This function connects to the database
 * @returns {boolean} the connection status as true if successful, else false
 * @async
 * @requires mongoose
 * @example
 * await connectToDB();
 */
const connectToDB = async () => {
  logger(`INFO`, `UTILS / CONNECT_TO_DB - Inside connect to DB`);
  let dbConnectionResult = false;
  try {
    const url = appConfig.databaseURL;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };

    const result = await mongoose.connect(url, options); // Connect to the database
    dbConnectionResult = result.connection.readyState === 1;
    if (dbConnectionResult) {
      // Check if the connection is successful
      logger(`INFO`, `UTILS / CONNECT_TO_DB - Connected to DB`);
    } else {
      logger(`ERROR`, `UTILS / CONNECT_TO_DB - Unable to connect to DB`);
      process.exit(1); // Do not start the server if the connection is not successful
    }
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / CONNECT_TO_DB - Error while connecting to DB \n Error - ${error}`
    );
    dbConnectionResult = false;
    process.exit(1); // Do not start the server if the connection is not successful
  }
  return dbConnectionResult;
};

/**
 * This function disconnects from the database
 * @returns {void}
 * @async
 * @requires mongoose
 * @example
 * await disconnectFromDB();
 */
const disconnectFromDB = async () => {
  logger(`INFO`, `UTILS / DISCONNECT_FROM_DB - Inside disconnect from DB`);
  try {
    await mongoose.disconnect(); // Disconnect from the database
    logger(`INFO`, `UTILS / DISCONNECT_FROM_DB - Disconnected from DB`);
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / DISCONNECT_FROM_DB - Error while disconnecting from DB \n Error - ${error}`
    );
    process.exit(1);
  }
};

module.exports = { connectToDB, disconnectFromDB };
