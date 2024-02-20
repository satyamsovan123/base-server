const { firebaseConfig, appConfig } = require("../../../../configs");
const { logger } = require("../../../../utils/logger");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const zlib = require("zlib");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} = require("firebase/storage");
const storage = getStorage();

const uploadToCloud = async (id, files) => {
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

      const storageRef = ref(storage, `${id}/${Date.now()}-${uuidv4()}`);

      // const compressedFile = await compressFile(file);

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

const deleteFileFromCloud = async (fileUrl) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / DELETEFILEFROMCLOUD - Inside delete file from cloud`
    );

    const storageRef = ref(storage, fileUrl);
    await deleteObject(storageRef);

    logger(
      `INFO`,
      `CONTROLLERS / DELETEFILEFROMCLOUD - Deleted file from cloud`
    );
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / DELETEFILEFROMCLOUD - Error while deleting file from cloud \n Error - ${error}`
    );
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
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / DELETELOCALFILE - Error while deleting local file \n Error - ${error}`
    );
  }
};

const compressFile = async (file) => {
  try {
    logger(`INFO`, `CONTROLLERS / COMPRESSFILE - Inside compress file`);
    logger(`INFO`, `CONTROLLERS / COMPRESSFILE - Compressing file - ${file}`);

    let compressedFile = {};

    const compressedBuffer = await new Promise((resolve, reject) => {
      zlib.gzip(file.buffer, (error, compressedBuffer) => {
        if (error) {
          logger(
            `ERROR`,
            `CONTROLLERS / COMPRESSFILE - Error while compressing file \n Error - ${error}`
          );
          reject(error);
        } else {
          resolve(compressedBuffer);
        }
      });
    });

    compressedFile = {
      ...file,
      buffer: compressedBuffer,
      originalname: `${file.originalname}`,
    };

    logger(`INFO`, `CONTROLLERS / COMPRESSFILE - File compressed`);
    return compressedFile;
  } catch (error) {
    logger(
      `ERROR`,
      `CONTROLLERS / COMPRESSFILE - Error while compressing file \n Error - ${error}`
    );
    return {};
  }
};

const deleteFolderFromCloud = async (id) => {
  try {
    logger(
      `INFO`,
      `CONTROLLERS / DELETEFOLDERFROMCLOUD - Inside delete folder from cloud`
    );
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

module.exports = { uploadToCloud, deleteFileFromCloud, deleteFolderFromCloud };
