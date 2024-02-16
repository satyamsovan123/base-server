const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");

const updateData = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / UPDATEDATA - Inside update data`);
    const userData = req.body;
    const userFiles = req.files;
    logger(
      `INFO`,
      `CONTROLLERS / UPDATEDATA - ${userFiles.length} file${
        userFiles.length > 0 ? `s` : ``
      } from user`
    );
    logger(
      `INFO`,
      `CONTROLLERS / UPDATEDATA - Request body - ${JSON.stringify(userData)}`
    );
    const updatedData = await Data.findByIdAndUpdate(userData.id, userData, {
      new: true,
    }).select("title article _id");

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
