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
      logger(error);
      cursorData = null;
    });
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
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

module.exports = {
  checkExistingData,
  checkExistingUser,
};
