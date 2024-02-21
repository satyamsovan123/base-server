const { firebaseConfig, appConfig } = require("../../../configs");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { logger, redactSensitiveInformation } = require("../../../utils");
const storage = getStorage();

const deleteFileFromCloud = async (fileUrl) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / DELETEFILEFROMCLOUD - Inside delete file from cloud`
    );

    if (!fileUrl) {
      logger(
        `ERROR`,
        `CONTROLLERS / DELETEFILEFROMCLOUD - No file url provided for deletion`
      );
      return;
    }

    const storageRef = ref(storage, fileUrl);
    await deleteObject(storageRef);

    logger(
      `INFO`,
      `CONTROLLERS / DELETEFILEFROMCLOUD - Deleted file from cloud - ${redactSensitiveInformation(
        result
      )}`
    );
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / DELETEFILEFROMCLOUD - Error while deleting file from cloud \n Error - ${error}`
    );
  }
};

module.exports = {
  deleteFileFromCloud,
};
