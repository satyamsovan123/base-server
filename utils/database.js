const mongoose = require("mongoose");
const { getServerDetails } = require("./getServerDetails");
const { logger } = require("./logger");
require("dotenv").config();

async function connectToDB() {
  logger(`INFO`, `UTILS / CONNECTTODB - Inside connect to DB`);
  const url = appConfig.databaseURL;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  mongoose.connect(url, options).then(
    () => {
      logger(`INFO`, `UTILS / CONNECTTODB - Connected to DB`);
      getServerDetails();
    },
    (error) => {
      logger(
        `ERROR`,
        `UTILS / CONNECTTODB - Error while connecting to DB \n Error - ${error}`
      );
      process.exit(1);
    }
  );
}

async function disconnectFromDB() {
  logger(`INFO`, `UTILS / DISCONNECTFROMDB - Inside disconnect from DB`);
  await mongoose.disconnect();
}

const checkDBConnection = () => {
  logger(`INFO`, `UTILS / CHECKDBCONNECTION - Inside check DB connection`);
  if (mongoose.connection.readyState !== 1) {
    logger(
      `INFO`,
      `UTILS / CHECKDBCONNECTION - ${
        mongoose.connection.readyState === 1 ? "Connected" : "Not connected"
      }`
    );
    return true;
  } else {
    logger(`ERROR`, `UTILS / CHECKDBCONNECTION - Not connected to DB`);
    return false;
  }
};

module.exports = { connectToDB, disconnectFromDB, checkDBConnection };
