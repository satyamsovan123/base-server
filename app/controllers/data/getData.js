const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const { paginationConfig } = require("../../../configs/paginationConfig");

const getDataById = async (req, res) => {
  try {
    logger(`CONTROLLERS / GETDATABYID - Inside get data by id`);

    const userData = req.body;
    logger(
      `CONTROLLERS / GETDATABYID - Request body - ${JSON.stringify(userData)}`
    );
    const data = await Data.find({
      _id: userData.id,
      email: userData.email,
    }).select("title article");

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`CONTROLLERS / GETDATABYID - No data found`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      responseConstant.GET_DATA_BY_ID_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`CONTROLLERS / GETDATABYID - Data found successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_DATA_BY_ID_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / GETDATABYID - Error while getting data by id \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getAllData = async (req, res) => {
  try {
    logger(
      `CONTROLLERS / GETALLDATA - Inside get all data (associated with email)`
    );
    const userData = req.body;
    logger(
      `CONTROLLER / GETALLDATA - Request body - ${JSON.stringify(userData)}`
    );
    logger(`CONTROLLER / GETALLDATA - Request query param - ${req.query}`);
    let offset = req.query.offset ?? 0;
    let sortByCreatedDate = req.query.sortByCreatedDate ?? false;
    let pagination = true;
    if (req.query.pagination === false || req.query.pagination === "false") {
      pagination = false;
    }

    if (/^\d*$/.test(offset)) {
      offset = parseInt(offset);
    }

    if (sortByCreatedDate === true) {
      paginationConfig.sort = { createdAt: -1 };
    }

    paginationConfig.offset = offset;

    let data = [];

    if (pagination === false) {
      logger(`CONTROLLERS / GETALLDATA - Pagination disabled`);
      data = await Data.find({ email: userData.email }).select("title article");
    } else {
      logger(`CONTROLLERS / GETALLDATA - Pagination enabled`);
      data = await Data.paginate(
        { email: userData.email },
        { ...paginationConfig, select: "title article" }
      );
    }

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`CONTROLLERS / GETALLDATA - No data found`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      pagination === false
        ? responseConstant.GET_ALL_DATA_SUCCESS
        : responseConstant.GET_ALL_DATA_SUCCESS +
            " " +
            responseConstant.REQUEST_FOR_MORE,
      statusCodeConstant.SUCCESS
    );

    logger(
      `CONTROLLERS / GETALLDATA - All data (associated with email) found successfully`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_ALL_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / GETALLDATA - Error while getting all data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getDataById, getAllData };
