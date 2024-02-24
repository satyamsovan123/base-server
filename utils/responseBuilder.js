/**
 * @fileoverview This file contains the class to build the response
 * @module utils/responseBuilder
 */
const { responseConstant, statusCodeConstant } = require("../constants");
const { logger } = require("./logger");

/**
 * This class builds the response with the given data, message and code
 */
class ResponseBuilder {
  /**
   * This constructor initializes the data, message and code, if not provided then default values are used
   * @param {object} data is the data object to be sent in the response
   * @param {string} message is the message to be sent in the response
   * @param {number} code is the status code to be sent in the response
   */
  constructor(data, message, code) {
    this.data = data ?? {};
    this.message = message ?? responseConstant.GENERIC_ERROR;
    this.code = code ?? statusCodeConstant.ERROR;
  }

  /**
   * This method builds the response with the given data, message and code
   */
  build() {
    let response = {
      data: this.data,
      message: this.message,
      code: this.code,
    };
    return response;
  }
}

/**
 * This function creates an object of ResponseBuilder and calls the build method to get the response
 * @param {object} data is the data object to be sent in the response
 * @param {string} message is the message to be sent in the response
 * @param {number} code is the status code to be sent in the response
 * @returns {object} response object
 */
const responseBuilder = (data, message, code) => {
  logger(`INFO`, `UTILS / RESPONSE_BUILDER - Inside response builder`);
  return new ResponseBuilder(data, message, code).build();
};

module.exports = { responseBuilder };
