const { firebaseConfig, appConfig } = require("../../../configs");
const { v4: uuidv4 } = require("uuid");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { logger, redactSensitiveInformation } = require("../../../utils");
const storage = getStorage();

const uploadFilesToCloud = async (id, newFiles) => {
  try {
    let fileUrls = [];

    logger(
      `INFO`,
      `CONTROLLERS / UPLOADNEWFILESTOCLOUD - Inside upload new files to cloud`
    );
    logger(
      `INFO`,
      `CONTROLLERS / UPLOADNEWFILESTOCLOUD - ${newFiles.length} file${
        newFiles.length > 1 ? "s" : ""
      } from user`
    );

    if (!id) {
      logger(
        `ERROR`,
        `CONTROLLERS / UPLOADNEWFILESTOCLOUD - No id provided for the folder`
      );
      return fileUrls;
    }

    for (const file of newFiles) {
      logger(`INFO`, `CONTROLLERS / UPLOADNEWFILESTOCLOUD - Uploading file`);

      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
        contentType: file.mimetype,
      };

      const storageRef = ref(storage, `${id}/${Date.now()}-${uuidv4()}`);

      // const compressedFile = await compressFile(file); // This is commented out because we are not compressing files.

      const result = await uploadBytes(storageRef, file.buffer, metadata);

      const fileUrl = await getDownloadURL(result.ref);

      fileUrls.push(fileUrl);

      // deleteLocalFile(file.path); // This is commented out because we are using memory storage.
    }

    logger(
      `INFO`,
      `CONTROLLERS / UPLOADNEWFILESTOCLOUD - ${fileUrls.length} file${
        fileUrls.length > 1 ? "s" : ""
      } uploaded successfully`
    );
    return fileUrls;
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / UPLOADNEWFILESTOCLOUD - Error while uploading new files to cloud \n Error - ${error}`
    );
    return [];
  }
};

module.exports = {
  uploadFilesToCloud,
};
