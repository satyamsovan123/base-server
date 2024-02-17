const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const { uploadToCloud, deleteFromCloud } = require("./utils/processFile");

const updateData = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / UPDATEDATA - Inside update data`);
    const userData = req.body;
    const userFiles = req.files;

    logger(
      `INFO`,
      `CONTROLLERS / UPDATEDATA - Request body - ${JSON.stringify(userData)}`
    );

    if (userFiles.length > 0) {
      const fileUrls = await uploadToCloud(userFiles);
      userData.files = fileUrls;
    } else {
      logger(`INFO`, `CONTROLLERS / UPDATEDATA - No files to upload`);
    }

    if (typeof userData.files === "string") {
      userData.files = [userData.files];
    }

    if (!userData.files) {
      userData.files = [];
    }

    const updatedData = await Data.findOneAndUpdate(
      { _id: userData.id },
      userData,
      {
        new: false,
        useFindAndModify: false,
      }
    ).select("title article _id files");

    const filesToBeDeleted = updatedData.files.filter((fileUrl) => {
      return !userData.files.includes(fileUrl);
    });

    filesToBeDeleted.forEach(async (fileUrl) => {
      await deleteFromCloud(fileUrl);
    });

    if (!updatedData) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.UPDATE_DATA_ERROR,
        statusCodeConstant.NOT_FOUND
      );
      logger(`INFO`, `CONTROLLERS / UPDATEDATA - No data to update`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      updatedData,
      responseConstant.UPDATE_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`INFO`, `CONTROLLERS / UPDATEDATA - Data updated successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.UPDATE_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / UPDATEDATA - Error while updating data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { updateData };
