const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");

const deleteAllData = async (req, res) => {
  try {
    logger(
      `CONTROLLERS / DELETEALLDATA - Inside delete all data (associated with email)`
    );
    const userData = req.body;
    logger(
      `CONTROLLERS / DELETEALLDATA - Request body - ${JSON.stringify(userData)}`
    );
    const deletedData = await Data.deleteMany({ email: userData.email });
    if (!deletedData || deletedData?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`CONTROLLERS / DELETEALLDATA - No data to delete`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      deletedData,
      responseConstant.DELETE_ALL_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(
      `CONTROLLERS / DELETEALLDATA - All data (associated with email) deleted successfully`
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.DELETE_ALL_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / DELETEALLDATA - Error while deleting all data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const deleteDataById = async (req, res) => {
  try {
    logger(`CONTROLLERS / DELETEDATABYID - Inside delete data by id`);
    const userData = req.body;
    logger(
      `CONTROLLERS / DELETEDATABYID - Request body - ${JSON.stringify(
        userData
      )}`
    );
    const deletedData = await Data.deleteOne({
      email: userData.email,
      _id: userData.id,
    });

    if (!deletedData || deletedData?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`CONTROLLERS / DELETEDATABYID - No data found to delete`);

      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      deletedData,
      responseConstant.DELETE_DATA_BY_ID_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`CONTROLLERS / DELETEDATABYID - Data deleted successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.DELETE_DATA_BY_ID_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / DELETEDATABYID - Error while deleting data by id \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { deleteAllData, deleteDataById };
