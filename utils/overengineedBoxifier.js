/**
 * @fileoverview This file contains the function to display the given array of string in a box
 * @module utils/overengineedBoxifier
 */
const { logger } = require("./logger");

const topDelimeter = "_";
const rightDelimeter = "|";
const leftDelimeter = "|";
const bottomDelimeter = "-";

/**
 * This function takes an array of string and displays it in a box
 * @param {Array} serverDetails is the array of string (serverDetails) to be displayed in the box
 * @returns {void}
 * @example
 * const serverDetails = ["Name - Server", "Status - Server is running on port 3000 in development environment."];
 * overengineedBoxifier(serverDetails);
 * // ________________________________________________________________________
 * // |  Name - Server                                                       |
 * // |  Status - Server is running on port 3000 in development environment. |
 * // ________________________________________________________________________
 */
const overengineedBoxifier = (serverDetails) => {
  logger(
    `INFO`,
    `UTILS / OVERENGINEED_BOXIFIER - Inside overengineed boxifier`
  );
  try {
    const informationLengths = serverDetails.map(
      (information) => information.length
    ); // Get the length of each information in the serverDetails array
    const highestLengthOfInformation = Math.max(...informationLengths); // Get the highest length of information

    console.log(`${topDelimeter} `.repeat(highestLengthOfInformation / 2 + 3)); // Print the top delimeter by repeating it the highest length of information / 2 + 4 times
    serverDetails.forEach((information) => {
      console.log(
        `${rightDelimeter} ${information} ${" ".repeat(
          highestLengthOfInformation - information.length
        )}${leftDelimeter}` // Print the information in the box by padding spaces to the right to make the information and the box of the same length
      );
    });
    console.log(
      `${bottomDelimeter} `.repeat(highestLengthOfInformation / 2 + 3)
    ); // Print the bottom delimeter by repeating it the highest length of information / 2 + 4 times
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / OVERENGINEED_BOXIFIER - Error in overengineed boxifier \n Error - ${error}`
    );
  }
};

module.exports = { overengineedBoxifier };
