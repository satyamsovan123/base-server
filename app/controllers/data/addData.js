const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");
const { Data } = require("../../models");

const { redactSensitiveInformation } = require("../../../utils");
const {
  uploadFilesToCloud,
  deleteFolderFromCloud,
  generateTagsFromData,
  detectProfanity,
} = require("../../services");

const addData = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / ADDDATA - Inside add data`);
    const userData = req.body;
    const newFiles = req.files;

    logger(
      `INFO`,
      `CONTROLLERS / ADDDATA - Request body - ${redactSensitiveInformation(
        userData
      )}`
    );

    const hasProfanityInArticle = await detectProfanity(userData.article);
    const hasProfanityInTitle = await detectProfanity(userData.title);
    const hasProfanity = hasProfanityInArticle || hasProfanityInTitle;

    const data = new Data({
      title: userData.title,
      article: userData.article,
      email: userData.email,
      hasProfanity: hasProfanity,
    });

    if (newFiles.length > 0) {
      const fileUrls = await uploadFilesToCloud(data.id, newFiles);

      if (fileUrls.length !== newFiles.length) {
        logger(
          `ERROR`,
          `CONTROLLERS / ADDDATA - Uploaded files count mismatch with new files count`
        );
        const id = data.id.toString();
        await deleteFolderFromCloud(id);
        const generatedResponse = responseBuilder(
          {},
          responseConstant.ADD_DATA_ERROR,
          statusCodeConstant.ERROR
        );
        return res.status(generatedResponse.code).send(generatedResponse);
      }

      data.fileUrls = fileUrls;
    } else {
      logger(`INFO`, `CONTROLLERS / UPDATEDATA - No new files to upload`);
    }

    const tags = await generateTagsFromData(data.article);
    data.tags = tags;
    const newData = await Data.create(data);

    if (!newData) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.ADD_DATA_ERROR,
        statusCodeConstant.ERROR
      );
      logger(`INFO`, `CONTROLLERS / ADDDATA - Unable to create new data`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(`INFO`, `CONTROLLERS / ADDDATA - Created new data`);
    const generatedResponse = responseBuilder(
      {
        title: newData.title,
        article: newData.article,
        id: newData._id,
        fileUrls: newData.fileUrls,
      },
      responseConstant.ADD_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    logger(`INFO`, `CONTROLLERS / ADDDATA - Data added successfully`);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.ADD_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / ADDDATA - Error while adding data \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { addData };
