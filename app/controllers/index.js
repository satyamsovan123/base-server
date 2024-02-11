const { signUp } = require("./authentication/signUp");
const { signIn } = require("./authentication/signIn");
const {
  getUserDataById,
  getAllUserData,
  getAllData,
} = require("./data/getData");
const { addData } = require("./data/addData");
const { deleteAllData, deleteDataById } = require("./data/deleteData");
const { updateData } = require("./data/updateData");
const {
  processOTPVerification,
} = require("./authentication/utils/processOTPVerification");
const { signOut } = require("./authentication/signOut");

module.exports = {
  signUp,
  signIn,
  getUserDataById,
  getAllUserData,
  getAllData,
  addData,
  deleteAllData,
  deleteDataById,
  updateData,
  processOTPVerification,
  signOut,
};
