const fs = require("fs");
const { logger } = require("../../../utils");

const deleteLocalFile = (file) => {
  try {
    logger(`INFO`, `CONTROLLERS / DELETELOCALFILE - Inside delete local file`);
    if (!file) {
      logger(
        `ERROR`,
        `CONTROLLERS / DELETELOCALFILE - No file provided for deletion`
      );
      return;
    }
    fs.unlinkSync(file);
    logger(`INFO`, `CONTROLLERS / DELETELOCALFILE - Deleted local file`);
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / DELETELOCALFILE - Error while deleting local file \n Error - ${error}`
    );
  }
};

module.exports = {
  deleteLocalFile,
};
