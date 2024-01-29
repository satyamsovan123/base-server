const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");

const deleteAllData = async (req, res) => {
  try {
    logger(["CONTROLLER: Inside delete all data"]);
    const userData = req.body;

    const deletedData = await Data.deleteMany({ email: userData.email });
    if (!deletedData || deletedData?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(["CONTROLLER: No data found"]);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      deletedData,
      responseConstant.DELETE_ALL_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(["CONTROLLER: All data deleted successfully"]);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.DELETE_ALL_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["CONTROLLER: Error while deleting all data", error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const deleteDataById = async (req, res) => {
  try {
    logger(["CONTROLLER: Inside delete data by id"]);
    const userData = req.body;

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
      logger(["CONTROLLER: No data found"]);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      deletedData,
      responseConstant.DELETE_DATA_BY_ID_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(["CONTROLLER: Data deleted successfully"]);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.DELETE_DATA_BY_ID_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["CONTROLLER: Error while deleting data by id", error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { deleteAllData, deleteDataById };
