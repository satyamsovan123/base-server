const { firebaseConfig, appConfig } = require("../../../../configs");
const { logger } = require("../../../../utils/logger");
const admin = require("firebase-admin");
const { uuid } = require("uuidv4");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: `gs://${appConfig.firebaseStorageBucket}`,
});

const storage = admin.storage();
const bucket = storage.bucket();

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

    for (let i = 0; i < files.length; i++) {
      logger(
        `INFO`,
        `CONTROLLERS / UPLOADTOCLOUD - Uploading file - ${JSON.stringify(
          files[i]
        )}`
      );
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuid(),
        },
        contentType: files[i].mimetype,
      };
      const uploadResult = await bucket.upload(files[i].path, {
        gzip: true,
        metadata: metadata,
      });
      const fileurl = await uploadResult[0].getSignedUrl({
        action: "read",
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
      });
      fileUrls.push(fileurl[0]);

      deleteLocalFile(files[i].path);
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

    const urlParts = fileUrl.split(
      `https://storage.googleapis.com/${appConfig.firebaseStorageBucket}/`
    );
    const bucketName = appConfig.firebaseStorageBucket;
    const filePath = urlParts[1].split("?")[0];

    const fileRef = storage.bucket(bucketName).file(filePath);

    await fileRef.delete();
    logger(
      `INFO`,
      `CONTROLLERS / DELETEFROMCLOUD - Deleted file from cloud - ${fileUrl}`
    );
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
