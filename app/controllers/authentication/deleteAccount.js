const { responseConstant, statusCodeConstant } = require("../../../constants");
const { logger } = require("../../../utils");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { User } = require("../../models");
const { Data } = require("../../models");
const { deleteFolderFromCloud } = require("../../services");

const deleteAccount = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / DELETEACCOUNT - Inside delete account`);

    const userData = req.body;

    const deletedUser = await User.deleteOne({ email: userData.email });

    if (!deletedUser || deletedUser?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.NO_USER_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      logger(`INFO`, `CONTROLLERS / DELETEACCOUNT - No user to delete`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const documentsToDelete = await Data.find({ email: userData.email });

    documentsToDelete.forEach(async (document) => {
      const id = document._id.toString();
      await deleteFolderFromCloud(id);
    });

    const generatedResponse = responseBuilder(
      {},
      responseConstant.DELETE_ACCOUNT_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.DELETE_ACCOUNT_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / DELETEACCOUNT - Error while deleting account \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { deleteAccount };
