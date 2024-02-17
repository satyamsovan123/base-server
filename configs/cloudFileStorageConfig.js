const { initializeApp } = require("firebase/app");
const { appConfig } = require("./appConfig");

const firebaseConfig = appConfig.firebaseConfig;

initializeApp(firebaseConfig);

module.exports = { firebaseConfig };
