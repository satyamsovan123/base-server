function logger(data) {
  if (appConfig.environment === "production") {
    return;
  }
  console.log(data);
}

module.exports = { logger };
