const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const {
  uploadFilesToCloud,
  deleteFolderFromCloud,
  deleteFileFromCloud,
} = require("../../services");

const updateData = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / UPDATEDATA - Inside update data`);
    const userData = req.body;
    const newFiles = req.files;

    let sanitizedFileUrls = [];

    if (userData.fileUrls) {
      if (typeof userData.fileUrls === "string") {
        sanitizedFileUrls.push(userData.fileUrls);
      } else {
        userData.fileUrls.forEach((url) => {
          sanitizedFileUrls.push(url);
        });
      }
      logger(
        `INFO`,
        `CONTROLLERS / UPDATEDATA - Updated file urls - ${sanitizedFileUrls}`
      );
    }

    if (newFiles.length > 0) {
      const fileUrls = await uploadFilesToCloud(userData.id, newFiles);

      if (fileUrls.length !== newFiles.length) {
        logger(
          `ERROR`,
          `CONTROLLERS / UPDATEDATA - Uploaded files count mismatch with new files count`
        );
        const id = userData.id.toString();
        await deleteFolderFromCloud(id);

        const generatedResponse = responseBuilder(
          {},
          responseConstant.UPDATE_DATA_ERROR,
          statusCodeConstant.ERROR
        );
        return res.status(generatedResponse.code).send(generatedResponse);
      }

      fileUrls.forEach((url) => {
        sanitizedFileUrls.push(url);
      });
      logger(
        `INFO`,
        `CONTROLLERS / UPDATEDATA - Updated file urls along with new file urls - ${sanitizedFileUrls}`
      );
    } else {
      logger(`INFO`, `CONTROLLERS / UPDATEDATA - No new files to upload`);
    }

    const previousFileUrls = await Data.findOne({ _id: userData.id }).select(
      "fileUrls"
    );
    logger(
      `INFO`,
      `CONTROLLERS / UPDATEDATA - Previous file urls - ${previousFileUrls.fileUrls}`
    );

    const filesToBeDeleted = [];

    previousFileUrls.fileUrls.forEach((fileUrl) => {
      if (!sanitizedFileUrls.includes(fileUrl)) {
        filesToBeDeleted.push(fileUrl);
      }
    });

    logger(
      `INFO`,
      `CONTROLLERS / UPDATEDATA - Files to be deleted - ${filesToBeDeleted}`
    );

    filesToBeDeleted.forEach(async (fileUrl) => {
      await deleteFileFromCloud(fileUrl);
    });

    userData.fileUrls = sanitizedFileUrls;

    const updatedData = await Data.findOneAndUpdate(
      { _id: userData.id },
      userData,
      {
        new: true,
        useFindAndModify: false,
      }
    ).select("title article _id fileUrls");

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
