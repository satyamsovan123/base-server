/**
 * @fileoverview Index file to export all the configurations
 * @module configs
 * @requires configs/appConfig
 * @requires configs/paginationConfig
 * @requires configs/fileStorageConfig
 * @requires configs/cloudFileStorageConfig
 */
const { appConfig } = require("./appConfig");
const { paginationConfig } = require("./paginationConfig");
const { upload } = require("./fileStorageConfig");
const { firebaseConfig } = require("./cloudFileStorageConfig");

module.exports = {
  appConfig,
  paginationConfig,
  upload,
  firebaseConfig,
};
