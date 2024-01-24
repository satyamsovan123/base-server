const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");

const addData = async (req, res) => {
  try {
    const userData = req.body;

    const newData = await Data.create(
      new Data({
        title: userData.title,
        article: userData.article,
        email: userData.email,
      })
    );

    if (!newData) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.ADD_DATA_ERROR,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      { title: newData.title, article: newData.article, id: newData._id },
      responseConstant.ADD_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.ADD_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["adddata", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { addData };
