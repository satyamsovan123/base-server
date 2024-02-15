const { Data } = require("../app/models");
const { User } = require("../app/models");
const { logger } = require("./logger");

const checkExistingData = async (title, email) => {
  logger(`INFO`, `UTILS / CHECKEXISTINGDATA - Inside check existing data`);
  let cursorData = null;
  if (!email || !title) {
    logger(`INFO`, `UTILS / CHECKEXISTINGDATA - Email or title not provided`);
    return cursorData;
  }
  await Data.findOne({ email: email, title: title })
    .select("title article _id")
    .then((result) => {
      cursorData = result;
      logger(
        `INFO`,
        `UTILS / CHECKEXISTINGDATA - Found existing data - ${cursorData}`
      );
    })
    .catch((error) => {
      logger(
        `ERROR`,
        `UTILS / CHECKEXISTINGDATA - Error while checking existing data \n Error - ${error}`
      );
      cursorData = null;
    });

  return cursorData;
};

const checkExistingUser = async (email) => {
  logger(`INFO`, `UTILS / CHECKEXISTINGUSER - Inside check existing user`);
  let cursorData = null;
  if (!email) {
    logger(`INFO`, `UTILS / CHECKEXISTINGUSER - Email not provided`);
    return cursorData;
  }
  await User.findOne({ email: email })
    .select("email password isVerified")
    .then((result) => {
      cursorData = result;
      logger(
        `INFO`,
        `UTILS / CHECKEXISTINGUSER - Found existing user - ${cursorData?.email}`
      );
    })
    .catch((error) => {
      logger(
        `ERROR`,
        `UTILS / CHECKEXISTINGUSER - Error while checking existing user \n Error - ${error}`
      );
      cursorData = null;
    });

  return cursorData;
};

module.exports = {
  checkExistingData,
  checkExistingUser,
};
