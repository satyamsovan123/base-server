/**
 * @fileoverview This file contains the function to log the data to the console and to the write it to log file
 * @module utils/logger
 */
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

const logsFolderPath = path.join(__dirname, "../logs");
if (!fs.existsSync(logsFolderPath)) {
  fs.mkdirSync(logsFolderPath);
}
const logFileName =
  appConfig.environment === "production" ? "production.log" : "development.log";
const logFilePath = path.join(__dirname, "../logs", logFileName);

/**
 * This function logs the data to the console and to the log file in the logs folder
 * @param {string} type is the type of log - INFO, ERROR, WARN
 * @param {string} data is the data to be logged
 * @returns {void}
 * @requires fs
 * @requires path
 * @requires luxon
 * @example
 * logger(`INFO`, `APP - SERVER STARTED`); // INFO - APP - SERVER STARTED
 */
const logger = (type, data) => {
  try {
    if (!type || !data) {
      console.log(
        `ERROR - UTILS / LOGGER - Type and data are required to log the data`
      );
      return;
    } // If type or data is not provided then log the error to the console

    const sanitizedData = `${DateTime.now().toLocaleString(
      DateTime.DATETIME_MED_WITH_SECONDS
    )} - ${type} - ${data} \n`; // Sanitize the data to be logged to the file by adding the date and time

    // if (appConfig.environment === "development") console.log(data);
    console.log(`${sanitizedData}`); // Log the data to the console

    fs.writeFile(logFilePath, sanitizedData, { flag: "a+" }, (error) => {
      if (error) {
        console.error(
          `ERROR - UTILS / LOGGER - Error while writing to log file - ${error}`
        );
      }
    }); // Write the data to the log file
  } catch (error) {
    console.error(
      `ERROR - UTILS / LOGGER - Error while writing to log file - ${error}`
    ); // If error occurs then log the error to the console
  }
};

module.exports = { logger };
