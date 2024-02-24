/**
 * @fileoverview This file contains the function to redact the sensitive information
 * @module utils/redactSensitiveInformation
 */
const { logger } = require("./logger");

const hiddenCharacters = `-`.repeat(5);
const visibleNumberOfCharacters = 3;

/**
 * This function redacts the sensitive information from the data by replacing it with hidden characters
 * @param {object} data is an object with sensitive information
 * @returns {string} data with sensitive information redacted
 * @example
 * const redactedData = redactSensitiveInformation({ email: "someemail@email.com" });
 * console.log(redactedData); // {"email":"-----@email.com"}
 * @example
 * const redactedData = redactSensitiveInformation({ password: "somepassword", otp: "123456"});
 * console.log(redactedData); // {"otp":"-----3456"}
 */
const redactSensitiveInformation = (data) => {
  logger(
    `INFO`,
    `UTILS / REDACT_SENSITIVE_INFORMATION - Inside redact sensitive information`
  );
  let redactedData = "";
  try {
    redactedData = JSON.parse(JSON.stringify(data)); // Deep copy the data to redactedData to avoid changing the original data

    for (const key in redactedData) {
      // Loop through the keys of redactedData object
      switch (key) {
        case "password":
          delete redactedData.password; // Delete the "password" key from redactedData object
          break;
        case "otp":
          redactedData.otp = redactOtp(redactedData.otp); // Redact the otp from redactedData
          break;
        case "token":
          redactedData.token = redactToken(redactedData.token); // Redact the token from redactedData
          break;
        case "email":
        case "sender":
        case "receiver":
          redactedData[key] = redactEmail(redactedData[key]); // Redact the emails like sender, receiver, etc. from redactedData
          break;
        default:
          break;
      }
    }
    redactedData = JSON.stringify(redactedData); // Convert the redactedData to string
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / REDACT_SENSITIVE_INFORMATION - Error while redacting sensitive information \n Error - ${error}`
    );
    redactedData = ""; // If error occurs then assign empty string to redactedData
  }
  return redactedData;
};

/**
 * This function redacts the email by replacing it with hidden characters
 * @param {string} email is the email to be redacted
 * @returns {string} redacted email with hidden characters
 */
const redactEmail = (email) => {
  let redactedEmail = "";
  try {
    const [username, domain] = email.split("@");
    const visiblePart = username.slice(0, visibleNumberOfCharacters);
    redactedEmail = `${visiblePart}${hiddenCharacters}@${domain}`;
  } catch (error) {
    redactedEmail = "";
  }
  return redactedEmail;
};

/**
 * This function redacts the token by replacing it with hidden characters
 * @param {string} token is the token to be redacted
 * @returns {string} redacted token with last 3 characters visible
 */
const redactToken = (token) => {
  let redactedToken = "";
  try {
    redactedToken = `${hiddenCharacters}${token.slice(
      -visibleNumberOfCharacters
    )}`;
  } catch (error) {
    redactedToken = "";
  }
  return redactedToken;
};

/**
 * This function redacts the otp by replacing it with hidden characters
 * @param {string} otp is the otp to be redacted
 * @returns {string} redacted otp with last 3 characters visible
 */
const redactOtp = (otp) => {
  let redactedOtp = "";
  try {
    redactedOtp = `${hiddenCharacters}${otp.slice(-visibleNumberOfCharacters)}`;
  } catch (error) {
    redactedOtp = "";
  }
  return redactedOtp;
};

module.exports = { redactSensitiveInformation };
