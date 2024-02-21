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

const deleteFolderFromCloud = async (id) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / DELETEFOLDERFROMCLOUD - Inside delete folder from cloud`
    );

    if (!id) {
      logger(
        `ERROR`,
        `CONTROLLERS / DELETEFOLDERFROMCLOUD - No folder id provided for deletion`
      );
      return;
    }

    const rootRef = ref(storage, id);
    const allFiles = await listAll(rootRef);

    allFiles.items.forEach(async (itemRef) => {
      const fileUrl = await getDownloadURL(itemRef);
      const storageRef = ref(storage, fileUrl);
      await deleteObject(storageRef);
    });

    logger(
      `INFO`,
      `CONTROLLERS / DELETEFOLDERFROMCLOUD - Deleted folder from cloud`
    );
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / DELETEFOLDERFROMCLOUD - Error while deleting folder from cloud \n Error - ${error}`
    );
  }
};

module.exports = {
  deleteFolderFromCloud,
};
