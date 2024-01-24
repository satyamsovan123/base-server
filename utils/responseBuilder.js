const { responseConstant, statusCodeConstant } = require("../constants");

class ResponseBuilder {
  constructor(data, message, code) {
    this.data = data ?? {};
    this.message = message ?? responseConstant.GENERIC_ERROR;
    this.code = code ?? statusCodeConstant.ERROR;
  }

  build() {
    let response = {
      data: this.data,
      message: this.message,
      code: this.code,
    };
    return response;
  }
}

function responseBuilder(data, message, code) {
  return new ResponseBuilder(data, message, code).build();
}

module.exports = { responseBuilder };
