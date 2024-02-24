/**
 * @fileoverview This file contains the functions to encrypt and compare the plain text with hash
 * @module utils/encryptionDecryption
 */
// TODO: Rename the file to encryptionOperation.js
const bcrypt = require("bcrypt");
const { logger } = require("./logger");

/**
 * This function encrypts the plain text
 * @param {string} plainText is the plain text to be encrypted
 * @returns {string} the encrypted text if plain text is encrypted, else empty string
 * @async
 * @requires bcrypt
 * @example
 * const encryptedText = await excryptPlainText("Some text");
 * console.log(encryptedText); // "$2b$10$GyJ6EJj7oR6Jw4c7yj8t"
 * @example
 * const encryptedText = await excryptPlainText("");
 * console.log(encryptedText); // ""
 */
const excryptPlainText = async (plainText) => {
  logger(`INFO`, `UTILS / ENCRPYPT_PLAIN_TEXT - Inside encrypt plain text`);
  let encryptedText = "";
  try {
    if (!plainText) {
      logger(`INFO`, `UTILS / ENCRPYPT_PLAIN_TEXT - Plain text not provided`);
      encryptedText = ""; // If plain text is not provided then assign empty string to encryptedText
    }
    encryptedText = await bcrypt.hash(plainText, appConfig.saltRounds); // Encrypt the plain text and assign it to encryptedText
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / ENCRPYPT_PLAIN_TEXT - Error while encrypting plain text \n Error - ${error}`
    );
    encryptedText = ""; // If error occurs then assign empty string to encryptedText
  }
  return encryptedText;
};

/**
 * This function compares the plain text and hash
 * @param {string} plainText is the plain text to be compared
 * @param {string} hash is the hash to be compared
 * @returns {boolean} comparison result as true if the plain text and hash match, else false
 * @async
 * @requires bcrypt
 * @example
 * const comparisonResult = await compareEncryptedText("Some text", "$2b$10$GyJ6EJj7oR6Jw4c7yj8t");
 * console.log(comparisonResult); // true
 * @example
 * const comparisonResult = await compareEncryptedText("", "");
 * console.log(comparisonResult); // false
 */
const compareEncryptedText = async (plainText, hash) => {
  logger(
    `INFO`,
    `UTILS / COMPARE_ENCRYPTED_TEXT - Inside compare encrypted text`
  );
  let comparisonResult = false;
  try {
    if (!plainText || !hash) {
      logger(
        `INFO`,
        `UTILS / COMPARE_ENCRYPTED_TEXT - Plain text or hash not provided`
      );
      comparisonResult = false; // If plain text or hash is not provided then assign false to comparisonResult
    }
    comparisonResult = await bcrypt.compare(plainText, hash); // Compare the plain text and hash and assign the result to comparisonResult
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / COMPARE_ENCRYPTED_TEXT - Error while comparing encrypted text \n Error - ${error}`
    );
    comparisonResult = false; // If error occurs then assign false to comparisonResult
  }
  return comparisonResult;
};

module.exports = { compareEncryptedText, excryptPlainText };
