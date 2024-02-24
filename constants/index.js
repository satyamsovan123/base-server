/**
 * @fileoverview Index file to export all the constants
 * @module constants
 * @requires constants/serverConstant
 * @requires constants/responseConstant
 * @requires constants/statusCodeConstant
 * @requires constants/appConstant
 */
const { serverConstant } = require("./serverConstant");
const { responseConstant } = require("./responseConstant");
const { statusCodeConstant } = require("./statusCodeConstant");
const { appConstant } = require("./appConstant");

module.exports = {
  serverConstant,
  statusCodeConstant,
  responseConstant,
  appConstant,
};

// TODO: Localize the constants
