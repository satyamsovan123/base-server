const mongoose = require("mongoose");
const { getServerDetails } = require("./getServerDetails");
const { logger } = require("./logger");
require("dotenv").config();

async function connectToDB() {
  const url = appConfig.databaseURL;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  mongoose.connect(url, options).then(
    () => {
      getServerDetails();
    },
    (error) => {
      logger(["UTIL: Error while connecting to database", error]);
    }
  );
}
async function disconnectFromDB() {
  await mongoose.disconnect();
}

module.exports = { connectToDB, disconnectFromDB };
