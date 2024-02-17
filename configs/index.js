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
