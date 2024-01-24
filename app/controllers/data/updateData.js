const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");

const updateData = async (req, res) => {
  try {
    const userData = req.body;

    const updatedData = await Data.findByIdAndUpdate(userData.id, userData, {
      new: true,
    }).select("title article _id");

    if (!updatedData) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.UPDATE_DATA_ERROR,
        statusCodeConstant.NOT_FOUND
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      updatedData,
      responseConstant.UPDATE_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.UPDATE_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["updatedata", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { updateData };
