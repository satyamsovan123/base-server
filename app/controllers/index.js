const { signUp } = require("./authentication/signUp");
const { signIn } = require("./authentication/signIn");
const { getAllData, getDataById } = require("./data/getData");
const { addData } = require("./data/addData");
const { deleteAllData, deleteDataById } = require("./data/deleteData");
const { updateData } = require("./data/updateData");
const {
  processOTPVerification,
} = require("./authentication/utils/processOTPVerification");

module.exports = {
  signUp,
  signIn,
  getAllData,
  getDataById,
  addData,
  deleteAllData,
  deleteDataById,
  updateData,
  processOTPVerification,
};
