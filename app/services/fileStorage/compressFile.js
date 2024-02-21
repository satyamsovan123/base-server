const fs = require("fs");
const { logger } = require("../../../utils");
const zlib = require("zlib");

const compressFile = async (file) => {
  try {
    logger(`INFO`, `CONTROLLERS / COMPRESSFILE - Inside compress file`);
    logger(`INFO`, `CONTROLLERS / COMPRESSFILE - Compressing file`);
    logger(`INFO`, `CONTROLLERS / COMPRESSFILE - File compressed`);

    if (!file) {
      logger(
        `ERROR`,
        `CONTROLLERS / COMPRESSFILE - No file provided for compression`
      );
      return;
    }

    return file;
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / COMPRESSFILE - Error while compressing file \n Error - ${error}`
    );
    return {};
  }
};

module.exports = {
  compressFile,
};
