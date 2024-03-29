const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const { paginationConfig } = require("../../../configs/paginationConfig");
const { redactSensitiveInformation } = require("../../../utils");

const getUserDataById = async (req, res) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / GETUSERDATABYID - Inside get user data by id`
    );

    const userData = req.body;
    logger(
      `INFO`,
      `CONTROLLERS / GETUSERDATABYID - Request body - ${redactSensitiveInformation(
        userData
      )}`
    );
    const data = await Data.find({
      _id: userData.id,
      email: userData.email,
    }).select("title article email fileUrls");

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`INFO`, `CONTROLLERS / GETUSERDATABYID - No data found`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      responseConstant.GET_USER_DATA_BY_ID_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`INFO`, `CONTROLLERS / GETUSERDATABYID - Data found successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_USER_DATA_BY_ID_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / GETUSERDATABYID - Error while getting data by id \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getAllUserData = async (req, res) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / GETALLUSERDATA - Inside get all user data (associated with email)`
    );
    const userData = req.body;
    logger(
      `INFO`,
      `CONTROLLER / GETALLUSERDATA - Request body - ${redactSensitiveInformation(
        userData
      )}`
    );

    const data = await Data.find({ email: userData.email }).select(
      "title article email fileUrls createdAt"
    );

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`INFO`, `CONTROLLERS / GETALLUSERDATA - No data found`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      responseConstant.GET_ALL_USER_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    logger(
      `INFO`,
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
      `ERROR`,
      `CONTROLLERS / GETALLUSERDATA - Error while getting all user data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getAllData = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / GETALLDATA - Inside get all data`);
    const userData = req?.body;

    logger(
      `INFO`,
      `CONTROLLER / GETALLDATA - Request body - ${redactSensitiveInformation(
        userData
      )}`
    );
    logger(
      `INFO`,
      `CONTROLLER / GETALLDATA - Request query param - ${redactSensitiveInformation(
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
      logger(`INFO`, `CONTROLLERS / GETALLDATA - Pagination disabled`);
      data = await Data.find({}).select(
        "title article email -_id fileUrls createdAt hasProfanity tags"
      );
    } else {
      logger(`INFO`, `CONTROLLERS / GETALLDATA - Pagination enabled`);
      data = await Data.paginate(
        {},
        {
          ...paginationConfig,
          select:
            "title article email -_id fileUrls createdAt hasProfanity tags",
        }
      );
    }
    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`INFO`, `CONTROLLERS / GETALLDATA - No data found`);
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

    logger(`INFO`, `CONTROLLERS / GETALLDATA - All data found successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_ALL_USER_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / GETALLDATA - Error while getting all data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getUserDataById, getAllUserData, getAllData };
