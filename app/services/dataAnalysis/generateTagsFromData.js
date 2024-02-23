const { appConfig } = require("../../../configs");
const { logger } = require("../../../utils");
const axios = require("axios");

const generateTagsFromData = async (data) => {
  let tags = [];
  try {
    logger(
      `INFO`,
      `SERVICES / GENERATETAGSFROMDATA - Inside generate tags from data`
    );

    const params = new URLSearchParams();
    params.append("text", data);
    params.append("extractors", "topics");

    const result = await axios.post("https://api.textrazor.com/", params, {
      headers: {
        "x-textrazor-key": appConfig.textRazorAPIKey,
      },
    });

    if (result.data.response.topics) {
      const topics = result.data.response.topics.map((topic) => topic.label);
      const topThreeTopics = topics.slice(0, 3);
      tags = topThreeTopics;
    }

    return tags;
  } catch (error) {
    logger(
      `ERROR`,
      `SERVICES / GENERATETAGSFROMDATA - Error while generating tags from data \n Error - ${error}`
    );
    return tags;
  }
};

module.exports = {
  generateTagsFromData,
};
