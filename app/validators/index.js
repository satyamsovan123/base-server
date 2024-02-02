const { AuthenticationValidator } = require("./AuthenticationValidator");
const { AddDataValidator } = require("./AddDataValidator");
const { UpdateDataValidator } = require("./UpdateDataValidator");
const { GetByIdValidator } = require("./GetByIdValidator");
const {
  ProcessOTPVerificationValidator,
} = require("./ProcessOTPVerificationValidator");

module.exports = {
  AuthenticationValidator,
  AddDataValidator,
  UpdateDataValidator,
  GetByIdValidator,
  ProcessOTPVerificationValidator,
};
