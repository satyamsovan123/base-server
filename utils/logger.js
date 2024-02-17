const { appConfig } = require("../configs/appConfig");
const path = require("path");
const fs = require("fs");
const { DateTime } = require("luxon");

const logsFolderPath = path.join(__dirname, "../app/logs");
if (!fs.existsSync(logsFolderPath)) {
  fs.mkdirSync(logsFolderPath);
}

const productionLogFilePath = path.join(
  __dirname,
  "../app/logs",
  "production.log"
);
const developmentLogFilePath = path.join(
  __dirname,
  "../app/logs",
  "development.log"
);
const logFilePath =
  appConfig.environment === "production"
    ? productionLogFilePath
    : developmentLogFilePath;

function logger(type, data) {
  const sanitizedData = `${DateTime.now().toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS
  )} - ${type} - ${data} \n`;

  // if (appConfig.environment === "development") console.log(data);
  console.log(`${type} - ${data} \n`);

  fs.writeFile(logFilePath, sanitizedData, { flag: "a+" }, (error) => {
    if (error) {
      console.error(error);
    }
  });
}

module.exports = { logger };
