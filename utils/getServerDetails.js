const { appConfig } = require("../configs/appConfig");
const { logger } = require("./logger");
const { overengineedBoxifier } = require("./overengineedBoxifier");
const fs = require("fs").promises;

async function getServerDetails() {
  const data = await fs.readFile("VERSION", "utf8");
  const majorVersion = data.split("\n")[0].split("=")[1];
  const minorVersion = data.split("\n")[1].split("=")[1];
  appConfig.appVersion = `${majorVersion}.${minorVersion}`;

  logger(`UTILS / GETSERVERDETAILS - Inside get server details`);
  const environment = appConfig.environment;
  const port = appConfig.port;
  const databaseName = appConfig.databaseName;
  const appName = appConfig.appName;
  const frontendURL = appConfig.frontendURL;
  const backendURL = appConfig.backendURL;
  const appVersion = appConfig.appVersion;

  const messages = [
    `Name - ${appName}`,
    `Status - Server is running on port ${port} in ${environment} environment.`,
    `Using database - ${databaseName}`,
    `Frontend URL - ${frontendURL}`,
    `Backend URL - ${backendURL}`,
    `Version - ${appVersion}`,
  ];

  overengineedBoxifier(messages);
}

module.exports = { getServerDetails };
