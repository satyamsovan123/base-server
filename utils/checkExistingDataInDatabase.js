const { Data } = require("../app/models");
const { User } = require("../app/models");
const { logger } = require("./logger");

const checkExistingData = async (title, email) => {
  let cursorData = null;
  if (!email || !title) {
    return cursorData;
  }
  await Data.findOne({ email: email, title: title })
    .select("title article _id")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(["Error while checking existing data", error]);
      cursorData = null;
    });
  logger(["Existing data", cursorData]);
  return cursorData;
};

const checkExistingUser = async (email) => {
  let cursorData = null;
  if (!email) {
    return cursorData;
  }
  await User.findOne({ email: email })
    .select("email password")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(["Error while checking existing user", error]);
      cursorData = null;
    });
  logger(["UTIL: Existing user", cursorData]);

  return cursorData;
};

module.exports = {
  checkExistingData,
  checkExistingUser,
};
