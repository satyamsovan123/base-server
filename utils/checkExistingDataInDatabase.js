/**
 * @fileoverview This file contains the functions to check if the data exists in the database
 * @module utils/checkExistingDataInDatabase
 */
const { Data } = require("../app/models");
const { User } = require("../app/models");
const { logger } = require("./logger");
const { redactSensitiveInformation } = require("./redactSensitiveInformation");

/**
 * This function checks if the data exists in the database
 * @param {string} title is the title of the article
 * @param {string} email is the email of the user
 * @returns {object|null} the data if it exists, else null
 * @async
 * @requires mongoose
 * @requires Data
 * @example
 * const data = await checkExistingData("Title", "someemail@email.com");
 * console.log(data); // { title: "Title", article: "Some article", _id: "5f8a5c2f5a4d8d2a7c7f3b8a" }
 * @example
 * const data = await checkExistingData("", "");
 * console.log(data); // null
 */
const checkExistingData = async (title, email) => {
  logger(`INFO`, `UTILS / CHECK_EXISTING_DATA - Inside check existing data`);
  let cursorData = null;
  try {
    if (!email || !title) {
      logger(
        `INFO`,
        `UTILS / CHECK_EXISTING_DATA - Email or title not provided`
      );
      cursorData = null; // If email or title is not provided then assign null to cursorData
    }
    cursorData = await Data.findOne({ email: email, title: title }).select(
      "title article _id"
    ); // Find the data with the given email and title and assign it to cursorData

    logger(
      `INFO`,
      `UTILS / CHECK_EXISTING_DATA - Found existing data - ${redactSensitiveInformation(
        cursorData
      )}`
    );
  } catch (error) {
    cursorData = null; // If error occurs then assign null to cursorData
    logger(
      `ERROR`,
      `UTILS / CHECK_EXISTING_DATA - Error while checking existing data \n Error - ${error}`
    );
  }
  return cursorData;
};

/**
 * This function checks if the user exists in the database
 * @param {string} email is the email of the user
 * @returns {object|null} the data if it exists, else null
 * @async
 * @requires mongoose
 * @requires User
 * @example
 * const user = await checkExistingUser("someemail@email.com")
 * console.log(user); // { email: "someemail@email.com", isVerified: true }
 * @example
 * const user = await checkExistingUser("");
 * console.log(user); // null
 */
const checkExistingUser = async (email) => {
  logger(`INFO`, `UTILS / CHECK_EXISTING_USER - Inside check existing user`);
  let cursorData = null;
  try {
    if (!email) {
      logger(`INFO`, `UTILS / CHECK_EXISTING_USER - Email not provided`);
      cursorData = null; // If email is not provided then assign null to cursorData
    }
    cursorData = await User.findOne({ email: email }).select(
      "email password isVerified -_id"
    ); // Find the user with the given email and assign it to cursorData

    logger(
      `INFO`,
      `UTILS / CHECK_EXISTING_USER - Found existing user - ${redactSensitiveInformation(
        { email: cursorData.email, isVerified: cursorData.isVerified }
      )}`
    );
  } catch (error) {
    cursorData = null; // If error occurs then assign null to cursorData
    logger(
      `ERROR`,
      `UTILS / CHECK_EXISTING_USER - Error while checking existing user \n Error - ${error}`
    );
  }
  return cursorData;
};

module.exports = {
  checkExistingData,
  checkExistingUser,
};
