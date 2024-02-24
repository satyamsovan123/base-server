/**
 * @fileoverview This file has the configuration for the cloud file storage (Firebase)
 * @module configs/cloudFileStorageConfig
 */

const { initializeApp } = require("firebase/app");

/**
 * This constant contains the configuration for the Firebase cloud storage
 * @constant {object}
 * @requires firebase/app
 */
const firebaseConfig = appConfig.firebaseConfig; // Firebase configuration

initializeApp(firebaseConfig);

module.exports = { firebaseConfig };
