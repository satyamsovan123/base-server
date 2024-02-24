/**
 * @fileoverview This file contains the function to generate a JWT token
 * @module utils/authenticationHelper
 */
const jwt = require("jsonwebtoken");
const { logger } = require("./logger");
const { redactSensitiveInformation } = require("./redactSensitiveInformation");

/**
 * This function generates a JWT token
 * @param {object} data is the data to be encrypted
 * @returns {string} the JWT token if generated, else empty string
 * @async
 * @requires jwt
 * @example
 * const token = await generateJWT({ email: "someemail@email.com" });
 * console.log(token); // "eyJhbGciOiJIUzIR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiJ9.5J9"
 * @example
 * const token = await generateJWT("");
 * console.log(token); // ""
 */
const generateJWT = async (data) => {
  logger(`INFO`, `UTILS / GENERATE_JWT - Inside generate JWT`);
  let token = "";
  try {
    if (!data) {
      logger(`INFO`, `UTILS / GENERATE_JWT - Data not provided`);
      token = ""; // If data is not provided then assign empty string to token
    }
    token = jwt.sign(data, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiresIn,
    }); // Generate JWT and assign it to token

    logger(
      `INFO`,
      `UTILS / GENERATE_JWT - JWT generated for ${redactSensitiveInformation(
        data
      )}`
    );
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / GENERATE_JWT - Error while generating JWT \n Error - ${error}`
    );
    token = ""; // If error occurs then assign empty string to token
  }
  return token;
};

module.exports = {
  generateJWT,
};
