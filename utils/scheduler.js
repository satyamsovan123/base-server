const { logger } = require("./logger");
var cron = require("node-cron");
const { sendCampaignEmail } = require("./sendCampaignEmail");
const { Data } = require("../app/models");
const { appConfig } = require("../configs/appConfig");

async function scheduler() {
  logger(`UTILS / SCHEDULER - Inside scheduler`);

  // 0 50 15 * * *
  cron.schedule("*/15 * * * *", async () => {
    const allData = await Data.find({}).select("title article email");
    const randomData = allData[Math.floor(Math.random() * allData.length)];

    logger(`UTILS / SCHEDULER - Random data - ${JSON.stringify(randomData)}`);

    logger(
      `UTILS / SCHEDULER - Inside cron job that runs every day at 14:57:00 PM`
    );
    await sendCampaignEmail(
      appConfig.testEmail,
      `<h3>${randomData.title}</h3> \n <article>${randomData.article}</article>`
    );
  });
}

module.exports = { scheduler };
