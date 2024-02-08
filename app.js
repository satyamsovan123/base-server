const { appConfig } = require("./configs/appConfig");
global.appConfig = appConfig;
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const {
  connectToDB,
  disconnectFromDB,
  checkDBConnection,
} = require("./utils/database");
const { scheduler } = require("./utils/scheduler");
const { serverConstant } = require("./constants/serverConstant");
const app = express();
const routes = require("./app/routes");

const webFrontendURL = appConfig.frontendURL;

app.use(express.static("public/base-server-ui"));
app.use(cookieParser());

app.use(
  cors({
    origin: webFrontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: serverConstant.AUTHORIZATION_HEADER_KEY,
  })
);

app.use(express.json());

app.use(routes);

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
  process.exit(1);
});

app.listen(appConfig.port, async () => {
  await connectToDB();
  scheduler();
});
