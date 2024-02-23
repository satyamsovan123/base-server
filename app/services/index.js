const { sendCampaignEmail } = require("./email/sendCampaignEmail");
const { sendOTP } = require("./email/sendOTP");
const { verifyOTP } = require("./email/verifyOTP");
const { deleteLocalFile } = require("./fileStorage/deleteLocalFile");
const { compressFile } = require("./fileStorage/compressFile");
const { deleteFileFromCloud } = require("./cloudStorage/deleteFileFromCloud");
const { uploadFilesToCloud } = require("./cloudStorage/uploadFilesToCloud");
const {
  deleteFolderFromCloud,
} = require("./cloudStorage/deleteFolderFromCloud");
const { generateTagsFromData } = require("./dataAnalysis/generateTagsFromData");
const { detectProfanity } = require("./dataAnalysis/detectProfanity");

module.exports = {
  sendCampaignEmail,
  sendOTP,
  verifyOTP,
  deleteLocalFile,
  compressFile,
  deleteFileFromCloud,
  uploadFilesToCloud,
  deleteFolderFromCloud,
  generateTagsFromData,
  detectProfanity,
};
