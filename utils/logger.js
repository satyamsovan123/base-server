// const winston = require("winston");
const { appConfig } = require("../configs/appConfig");
const path = require("path");
const fs = require("fs");

const logsFolderPath = path.join(__dirname, "../logs");
if (!fs.existsSync(logsFolderPath)) {
  fs.mkdirSync(logsFolderPath);
}

const productionLogFilePath = path.join(__dirname, "../logs", "production.log");
const developmentLogFilePath = path.join(
  __dirname,
  "../logs",
  "development.log"
);
const logFilePath =
  appConfig.environment === "production"
    ? productionLogFilePath
    : developmentLogFilePath;

function logger(data) {
  const sanitizedData = `${new Date()} - ${data} \n`;

  // if (appConfig.environment === "development") console.log(data);
  console.log(data);

  fs.writeFile(logFilePath, sanitizedData, { flag: "a+" }, (error) => {
    if (error) {
      console.error(error);
    }
  });
}

module.exports = { logger };
