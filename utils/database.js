const mongoose = require("mongoose");
const { getServerDetails } = require("./getServerDetails");
require("dotenv").config();

async function connectToDB() {
  const url = appConfig.databaseURL;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  mongoose.connect(url, options).then(
    () => {
      getServerDetails();
    },
    (error) => {
      console.error(error);
    }
  );
}
async function disconnectFromDB() {
  await mongoose.disconnect();
}

module.exports = { connectToDB, disconnectFromDB };
