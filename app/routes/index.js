const express = require("express");
const router = express.Router();
const { responseBuilder } = require("../../utils/responseBuilder");
const { serverConstant, statusCodeConstant } = require("../../constants/");
const { logger } = require("../../utils");

const baseURL = serverConstant.BASE_API;
router.use(baseURL, require("./authentication"));
router.use(baseURL, require("./data"));

router.get("/", (req, res) => {
  try {
    const generatedResponse = responseBuilder(
      {},
      serverConstant.SERVER_IS_RUNNING,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    let generatedResponse = responseBuilder();
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

router.get("/test", (req, res) => {
  try {
    const query = req.query;
    if (query.error) {
      throw new Error("This is a test error");
    } else if (query.delayedResponse) {
      setTimeout(() => {
        const generatedResponse = responseBuilder(
          {},
          serverConstant.SERVER_IS_RUNNING,
          statusCodeConstant.SUCCESS
        );
        return res.status(generatedResponse.code).send(generatedResponse);
      }, 5000);
    } else {
      const generatedResponse = responseBuilder(
        {},
        serverConstant.SERVER_IS_RUNNING,
        statusCodeConstant.SUCCESS
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }
  } catch (error) {
    logger(`ROUTES / TEST - Error while testing \n Error - ${error}`);
    let generatedResponse = responseBuilder();
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

router.use("*", (req, res) => {
  try {
    const generatedResponse = responseBuilder(
      {},
      serverConstant.INVALID_API_PATH,
      statusCodeConstant.NOT_FOUND
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder();
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

module.exports = router;
