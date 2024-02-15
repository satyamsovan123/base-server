const { appConfig } = require("./configs/appConfig");
global.appConfig = appConfig;

const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const trimRequest = require("trim-request");

const express = require("express");
const cors = require("cors");
const {
  connectToDB,
  disconnectFromDB,
  checkDBConnection,
} = require("./utils/database");
const { runScheduler } = require("./utils/runScheduler");
const { serverConstant } = require("./constants/serverConstant");
const app = express();
const routes = require("./app/routes");
const { logger } = require("./utils");

const webFrontendURL = appConfig.frontendURL;

app.use(express.static("public/base-server-ui"));

app.use(trimRequest.all);

app.use(cookieParser());

app.use(helmet());

app.use(
  cors({
    origin: webFrontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: serverConstant.AUTHORIZATION_HEADER_KEY,
    credentials: true,
  })
);

app.use(express.json());

app.use(compression());

app.use(routes);

app.set("trust proxy", 1); // For express-rate-limit to work, as Heroku would be acting like proxy - https://stackoverflow.com/questions/62494060/express-rate-limit-not-working-when-deployed-to-heroku

process.on("SIGINT", async () => {
  await disconnectFromDB();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await disconnectFromDB();
  process.exit(0);
});
process.on("uncaughtException", async (error) => {
  await disconnectFromDB();
  console.error("Uncaught exception: ", error);
  logger(`ERROR`, `APP - UNCAUGHTEXCEPTION \n Error - ${error}`);
  process.exit(1);
});

app.listen(appConfig.port, async () => {
  await connectToDB();
  runScheduler();
});
