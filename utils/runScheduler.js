const { logger } = require("./logger");
const cron = require("node-cron");
const {
  sendCampaignEmail,
} = require("../app/services/email/sendCampaignEmail");
const { Data } = require("../app/models");
const { appConfig } = require("../configs/appConfig");

async function runScheduler() {
  logger(`INFO`, `UTILS / RUNSCHEDULER - Inside run scheduler`);
  // 0 30 08 * * * - At 08:30:00 AM every day
  // */10 * * * * - Every 10 minutes
  cron.schedule(appConfig.cronJobFrequency, async () => {
    const allData = await Data.find({}).select("title article email");
    const randomData = allData[Math.floor(Math.random() * allData.length)];

    logger(
      `INFO`,
      `UTILS / RUNSCHEDULER - Inside cron job that runs every day at 08:30:00 AM`
    );
    // await sendCampaignEmail(
    //   appConfig.testEmail,
    //   `<h3>${randomData.title}</h3> \n <article>${randomData.article}</article>`
    // );
  });
}

module.exports = { runScheduler };
