const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");

const addData = async (req, res) => {
  try {
    logger(`CONTROLLERS / ADDDATA - Inside add data`);
    const userData = req.body;
    logger(
      `CONTROLLERS / ADDDATA - Request body - ${JSON.stringify(userData)}`
    );
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
      logger(`CONTROLLERS / ADDDATA - Unable to create new data`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(`CONTROLLERS / ADDDATA - Created new data`);
    const generatedResponse = responseBuilder(
      { title: newData.title, article: newData.article, id: newData._id },
      responseConstant.ADD_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    logger(`CONTROLLERS / ADDDATA - Data added successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.ADD_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / ADDDATA - Error while adding data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { addData };
