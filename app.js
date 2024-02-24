/**
 * @fileoverview This file contains the code to start the server
 * @module app
 */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const trimRequest = require("trim-request");

const { appConfig } = require("./configs/appConfig");
global.appConfig = appConfig; // Making appConfig global so that it can be accessed from anywhere in the application

const { disconnectFromDB } = require("./utils/database");
const { serverConstant } = require("./constants/serverConstant");
const routes = require("./app/routes");
const { logger, startServer, getAllEnvironmentVariables } = require("./utils");

const app = express();

// TODO: Add central error handling middleware

app.use(express.static("public/baseServerUi"));
app.use(trimRequest.all);
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: appConfig.frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: serverConstant.AUTHORIZATION_HEADER_KEY,
    credentials: true,
  })
);
app.use(express.json());
app.use(compression());
app.use(routes);
app.set("trust proxy", 1); // For express-rate-limit to work, as Heroku would be acting like proxy - https://stackoverflow.com/questions/62494060/express-rate-limit-not-working-when-deployed-to-heroku

/**
 * This function disconnects from database to avoid memory leaks and logs the error
 */
process
  .on("SIGINT", async () => {
    await disconnectFromDB();
    process.exit(0);
  })
  .on("SIGTERM", async () => {
    await disconnectFromDB();
    process.exit(0);
  })
  .on("uncaughtException", async (error) => {
    await disconnectFromDB();
    console.error("Uncaught exception - ", error);
    logger(`ERROR`, `APP - UNCAUGHT_EXCEPTION \n Error - ${error}`);
    process.exit(1);
  });

/**
 * This function starts the server on the given port, and serves as the entry point of the application
 * @async
 */
app.listen(appConfig.port, async () => {
  await startServer();
});
