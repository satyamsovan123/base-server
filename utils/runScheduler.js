/**
 * @fileoverview This file contains the function to run the scheduler
 * @module utils/runScheduler
 */
const cron = require("node-cron");
const { logger } = require("./logger");
const { Data } = require("../app/models");
const {
  sendCampaignEmail,
} = require("../app/services/email/sendCampaignEmail");

/**
 * This function runs the scheduler to send the campaign email
 * @returns {void}
 * @async
 * @example
 * runScheduler(); // Even though this function is async, it is not awaited because it is a scheduler and runs in the background
 */
const runScheduler = () => {
  logger(`INFO`, `UTILS / RUN_SCHEDULER - Inside run scheduler`);
  try {
    if (!appConfig.useScheduler) {
      logger(`INFO`, `UTILS / RUN_SCHEDULER - Scheduler is disabled`);
      return;
    }
    // 0 30 08 * * * - At 08:30:00 AM every day
    // */10 * * * * - Every 10 minutes
    cron.schedule(appConfig.cronJobFrequency, async () => {
      logger(
        `INFO`,
        `UTILS / RUN_SCHEDULER - Inside cron job that runs every day at 08:30:00 AM`
      );
      // Send the campaign email
      // await sendCampaignEmail(
      //   appConfig.testEmail,
      //   `<h3>Hello, world!</h3> \n <article>Lorem ipsum</article>`
      // );
    });
  } catch (error) {
    logger(
      `ERROR`,
      `UTILS / RUN_SCHEDULER - Error while running scheduler \n Error - ${error}`
    );
  }
};

module.exports = { runScheduler };
