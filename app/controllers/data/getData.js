const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");
const { paginationConfig } = require("../../../configs/paginationConfig");

const getDataById = async (req, res) => {
  try {
    logger(["CONTROLLER: Inside get data by id"]);
    const userData = req.body;

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
      logger(["CONTROLLER: No data found"]);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      responseConstant.GET_DATA_BY_ID_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    logger(["CONTROLLER: Data found successfully", data]);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_DATA_BY_ID_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["CONTROLLER: Error while getting data by id", error]);

    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getAllData = async (req, res) => {
  try {
    logger(["CONTROLLER: Inside get all data"]);
    const userData = req.body;
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
      logger(["CONTROLLER: Pagination is disabled"]);
      data = await Data.find({ email: userData.email }).select("title article");
    } else {
      logger(["CONTROLLER: Pagination is enabled"]);
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
      logger(["CONTROLLER: No data found"]);
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

    logger(["CONTROLLER: All data found successfully", data]);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.GET_ALL_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["CONTROLLER: Error while getting all data", error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getDataById, getAllData };
