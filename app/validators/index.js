const { AuthenticationValidator } = require("./AuthenticationValidator");
const { AddDataValidator } = require("./AddDataValidator");
const { UpdateDataValidator } = require("./UpdateDataValidator");
const { GetByIdValidator } = require("./GetByIdValidator");

module.exports = {
  AuthenticationValidator,
  AddDataValidator,
  UpdateDataValidator,
  GetByIdValidator,
};
