const { AuthenticationValidator } = require("./AuthenticationValidator");
const { AddDataValidator } = require("./AddDataValidator");
const { UpdateDataValidator } = require("./UpdateDataValidator");
const { GetByIdValidator } = require("./GetByIdValidator");
const { ProcessOTPValidator } = require("./ProcessOTPValidator");

module.exports = {
  AuthenticationValidator,
  AddDataValidator,
  UpdateDataValidator,
  GetByIdValidator,
  ProcessOTPValidator,
};
