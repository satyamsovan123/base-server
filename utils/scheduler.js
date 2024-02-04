const { logger } = require("./logger");
const cron = require("node-cron");
const { sendCampaignEmail } = require("./sendCampaignEmail");
const { Data } = require("../app/models");
const { appConfig } = require("../configs/appConfig");

async function scheduler() {
  logger(`UTILS / SCHEDULER - Inside scheduler`);
  // 0 30 08 * * * - At 08:30:00 AM every day
  // */10 * * * * - Every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    const allData = await Data.find({}).select("title article email");
    const randomData = allData[Math.floor(Math.random() * allData.length)];

    logger(
      `UTILS / SCHEDULER - Inside cron job that runs every day at 08:30:00 AM`
    );
    await sendCampaignEmail(
      appConfig.testEmail,
      `<h3>${randomData.title}</h3> \n <article>${randomData.article}</article>`
    );
  });
}

module.exports = { scheduler };
