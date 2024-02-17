const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const { uploadToCloud } = require("./utils/processFile");

const addData = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / ADDDATA - Inside add data`);
    const userData = req.body;
    const userFiles = req.files;

    logger(
      `INFO`,
      `CONTROLLERS / ADDDATA - Request body - ${JSON.stringify(userData)}`
    );

    if (userFiles.length > 0) {
      const fileUrls = await uploadToCloud(userFiles);
      userData.files = fileUrls;
    } else {
      logger(`INFO`, `CONTROLLERS / UPDATEDATA - No files to upload`);
    }

    const newData = await Data.create(
      new Data({
        title: userData.title,
        article: userData.article,
        email: userData.email,
        files: userData.files,
      })
    );

    if (!newData) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.ADD_DATA_ERROR,
        statusCodeConstant.ERROR
      );
      logger(`INFO`, `CONTROLLERS / ADDDATA - Unable to create new data`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(`INFO`, `CONTROLLERS / ADDDATA - Created new data`);
    const generatedResponse = responseBuilder(
      { title: newData.title, article: newData.article, id: newData._id },
      responseConstant.ADD_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    logger(`INFO`, `CONTROLLERS / ADDDATA - Data added successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.ADD_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / ADDDATA - Error while adding data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { addData };
