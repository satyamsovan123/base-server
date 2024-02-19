const { firebaseConfig, appConfig } = require("../../../../configs");
const { logger } = require("../../../../utils/logger");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const storage = getStorage();

const uploadToCloud = async (files) => {
  try {
    logger(`INFO`, `CONTROLLERS / UPLOADTOCLOUD - Inside upload file to cloud`);
    logger(
      `INFO`,
      `CONTROLLERS / UPLOADTOCLOUD - ${files.length} file${
        files.length > 1 ? "s" : ""
      } from user`
    );

    let fileUrls = [];

    for (const file of files) {
      logger(`INFO`, `CONTROLLERS / UPLOADTOCLOUD - Uploading file`);

      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
        contentType: file.mimetype,
      };

      const storageRef = ref(
        storage,
        `${firebaseConfig.documentBucketName}/${Date.now()}-${uuidv4()}`
      );

      const result = await uploadBytes(storageRef, file.buffer, metadata);

      const fileUrl = await getDownloadURL(result.ref);

      fileUrls.push(fileUrl);

      // deleteLocalFile(file.path); // This is commented out because we are using memory storage.
    }

    logger(
      `INFO`,
      `CONTROLLERS / UPLOADTOCLOUD - ${fileUrls.length} file${
        fileUrls.length > 1 ? "s" : ""
      } uploaded successfully`
    );
    return fileUrls;
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / UPLOADTOCLOUD - Error while uploading file to cloud \n Error - ${error}`
    );
    return [];
  }
};

const deleteFromCloud = async (fileUrl) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / DELETEFROMCLOUD - Inside delete file from cloud`
    );

    const storageRef = ref(storage, fileUrl);
    await deleteObject(storageRef);

    logger(`INFO`, `CONTROLLERS / DELETEFROMCLOUD - Deleted file from cloud`);
    return true;
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / DELETEFROMCLOUD - Error while deleting file from cloud \n Error - ${error}`
    );
    return false;
  }
};

const deleteLocalFile = (file) => {
  try {
    logger(`INFO`, `CONTROLLERS / DELETELOCALFILE - Inside delete local file`);
    fs.unlinkSync(file);
    logger(
      `INFO`,
      `CONTROLLERS / DELETELOCALFILE - Deleted local file - ${file}`
    );

    return true;
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / DELETELOCALFILE - Error while deleting local file \n Error - ${error}`
    );
    return false;
  }
};

module.exports = { uploadToCloud, deleteFromCloud };
