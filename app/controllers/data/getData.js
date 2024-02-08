const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const { paginationConfig } = require("../../../configs/paginationConfig");
var cookieParser = require("cookie-parser");

const getUserDataById = async (req, res) => {
  try {
    logger(`CONTROLLERS / GETUSERDATABYID - Inside get user data by id`);

    const userData = req.body;
    logger(
      `CONTROLLERS / GETUSERDATABYID - Request body - ${JSON.stringify(
        userData
      )}`
    );
    const data = await Data.find({
      _id: userData.id,
      email: userData.email,
    }).select("title article email");

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`CONTROLLERS / GETUSERDATABYID - No data found`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      responseConstant.GET_USER_DATA_BY_ID_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`CONTROLLERS / GETUSERDATABYID - Data found successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_USER_DATA_BY_ID_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / GETUSERDATABYID - Error while getting data by id \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getAllUserData = async (req, res) => {
  try {
    logger(
      `CONTROLLERS / GETALLUSERDATA - Inside get all user data (associated with email)`
    );
    const userData = req.body;
    logger(
      `CONTROLLER / GETALLUSERDATA - Request body - ${JSON.stringify(userData)}`
    );

    const data = await Data.find({ email: userData.email }).select(
      "title article email"
    );

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`CONTROLLERS / GETALLUSERDATA - No data found`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(data, statusCodeConstant.SUCCESS);

    logger(
      `CONTROLLERS / GETALLUSERDATA - All user data (associated with email) found successfully`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_ALL_USER_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / GETALLUSERDATA - Error while getting all user data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getAllData = async (req, res) => {
  try {
    logger(`CONTROLLERS / GETALLDATA - Inside get all data`);
    const userData = req?.body;
    logger(req.cookies);

    logger(
      `CONTROLLER / GETALLDATA - Request body - ${JSON.stringify(userData)}`
    );
    logger(
      `CONTROLLER / GETALLDATA - Request query param - ${JSON.stringify(
        req?.query
      )}`
    );
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
      data = await Data.find({}).select("title article email -_id");
    } else {
      logger(`CONTROLLERS / GETALLDATA - Pagination enabled`);
      data = await Data.paginate(
        {},
        { ...paginationConfig, select: "title article email -_id" }
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
        ? responseConstant.GET_ALL_DATA
        : responseConstant.GET_ALL_DATA +
            " " +
            responseConstant.REQUEST_FOR_MORE,
      statusCodeConstant.SUCCESS
    );

    logger(`CONTROLLERS / GETALLDATA - All data found successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_ALL_USER_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `CONTROLLERS / GETALLDATA - Error while getting all data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getUserDataById, getAllUserData, getAllData };
