const { Data } = require("../app/models");
const { User } = require("../app/models");
const { logger } = require("./logger");

const checkExistingData = async (title, email) => {
  logger(`UTILS / CHECKEXISTINGDATA - Inside check existing data`);
  let cursorData = null;
  if (!email || !title) {
    return cursorData;
    logger(`UTILS / CHECKEXISTINGDATA - Email or title not provided`);
  }
  await Data.findOne({ email: email, title: title })
    .select("title article _id")
    .then((result) => {
      cursorData = result;
      logger(`UTILS / CHECKEXISTINGDATA - Found existing data - ${cursorData}`);
    })
    .catch((error) => {
      logger(
        `UTILS / CHECKEXISTINGDATA - Error while checking existing data \n Error - ${error}`
      );
      cursorData = null;
    });

  return cursorData;
};

const checkExistingUser = async (email) => {
  logger(`UTILS / CHECKEXISTINGUSER - Inside check existing user`);
  let cursorData = null;
  if (!email) {
    logger(`UTILS / CHECKEXISTINGUSER - Email not provided`);
    return cursorData;
  }
  await User.findOne({ email: email })
    .select("email password isVerified")
    .then((result) => {
      cursorData = result;
      logger(
        `UTILS / CHECKEXISTINGUSER - Found existing user - ${cursorData?.email}`
      );
    })
    .catch((error) => {
      logger(
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
