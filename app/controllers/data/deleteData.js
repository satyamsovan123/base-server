const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const { redactSensitiveInformation } = require("../../../utils");
const { deleteFolderFromCloud } = require("../../services");

const deleteAllData = async (req, res) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / DELETEALLDATA - Inside delete all data (associated with email)`
    );
    const userData = req.body;
    logger(
      `INFO`,
      `CONTROLLERS / DELETEALLDATA - Request body - ${redactSensitiveInformation(
        userData
      )}`
    );

    const documentsToDelete = await Data.find({ email: userData.email });
    documentsToDelete.forEach(async (document) => {
      const id = document._id.toString();
      await deleteFolderFromCloud(id);
    });

    const deletedData = await Data.deleteMany({ email: userData.email });
    if (!deletedData || deletedData?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`INFO`, `CONTROLLERS / DELETEALLDATA - No data to delete`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      deletedData,
      responseConstant.DELETE_ALL_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(
      `INFO`,
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
      `ERROR`,
      `CONTROLLERS / DELETEALLDATA - Error while deleting all data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const deleteDataById = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / DELETEDATABYID - Inside delete data by id`);
    const userData = req.body;
    logger(
      `INFO`,
      `CONTROLLERS / DELETEDATABYID - Request body - ${redactSensitiveInformation(
        userData
      )}`
    );
    const deletedData = await Data.deleteOne({
      email: userData.email,
      _id: userData.id,
    });

    await deleteFolderFromCloud(userData.id);

    if (!deletedData || deletedData?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`INFO`, `CONTROLLERS / DELETEDATABYID - No data found to delete`);

      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      deletedData,
      responseConstant.DELETE_DATA_BY_ID_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`INFO`, `CONTROLLERS / DELETEDATABYID - Data deleted successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.DELETE_DATA_BY_ID_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / DELETEDATABYID - Error while deleting data by id \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { deleteAllData, deleteDataById };
