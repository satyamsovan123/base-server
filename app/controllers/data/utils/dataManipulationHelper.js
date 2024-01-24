const { logger } = require("../../../../utils");
const { Data } = require("../../../models");

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

module.exports = {
  checkExistingData,
};
