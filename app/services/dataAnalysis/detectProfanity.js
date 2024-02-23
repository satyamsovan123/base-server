const { appConfig } = require("../../../configs");
const { logger } = require("../../../utils");
const axios = require("axios");

const detectProfanity = async (data) => {
  let hasProfanity = false;
  try {
    logger(
      `INFO`,
      `SERVICES / DETECTPROFANITY - Inside detect profanity from data`
    );

    const sanitizedData = data.replace(/(\r\n|\n|\r)/gm, "");
    const result = await axios.post(
      `${appConfig.profanityCheckerURL}`,
      { body: sanitizedData },
      {
        headers: {
          apikey: appConfig.profanityCheckerAPIKey,
        },
      }
    );

    hasProfanity =
      result.data.bad_words_total && result.data.bad_words_total > 0;

    if (hasProfanity) {
      logger(
        `WARN`,
        `SERVICES / DETECTPROFANITY - Profanity detected - ${data}`
      );
    }
    return hasProfanity;
  } catch (error) {
    logger(
      `ERROR`,
      `SERVICES / DETECTPROFANITY - Error while detecting profanity from data \n Error - ${error}`
    );
    return hasProfanity;
  }
};

module.exports = {
  detectProfanity,
};
