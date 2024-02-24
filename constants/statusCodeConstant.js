/**
 * @fileoverview This file contains constants used for status codes
 * @module constants/statusCodeConstant
 */

/**
 * This constant is used for status codes
 * @constant {object}
 */
const statusCodeConstant = {
  SUCCESS: 200,
  ERROR: 500,
  UNAUTHORIZED: 401,
  INVALID: 400,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409,
  REDIRECT: 302,
  TOO_MANY_REQUESTS: 429,
};

module.exports = { statusCodeConstant };
