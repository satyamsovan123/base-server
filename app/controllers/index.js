const { signUp } = require("./authentication/signUp");
const { signIn } = require("./authentication/signIn");
const { getAllData, getDataById } = require("./data/getData");
const { addData } = require("./data/addData");
const { deleteAllData, deleteDataById } = require("./data/deleteData");
const { updateData } = require("./data/updateData");

const {
  checkExistingUser,
  generateJWT,
} = require("./authentication/utils/authenticationHelper");

const { checkExistingData } = require("./data/utils/dataManipulationHelper");

module.exports = {
  signUp,
  signIn,
  getAllData,
  getDataById,
  addData,
  deleteAllData,
  deleteDataById,
  updateData,
  checkExistingUser,
  generateJWT,
  checkExistingData,
};
