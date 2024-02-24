/**
 * @fileoverview This file uses multer to handle file storage
 * @module configs/fileStorageConfig
 */
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

/**
 * This constant is used to configure the file storage using multer
 * We are using memory storage to store the file in memory, it can be changed to disk storage
 * @constant {object}
 * @requires multer
 * @requires uuid
 */
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    if (appConfig.useLocalStorage) {
      cb(null, "uploads/"); // The file will be stored in the uploads folder, only if the useLocalStorage is true
    }
  },
  filename: function (req, file, cb) {
    // The file name will be a combination of the current date and a unique id to avoid conflicts and bad file names
    const fileName = `${Date.now()}-${uuidv4()}`;
    file.originalname = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
