const { responseConstant, statusCodeConstant } = require("../constants");
const { logger } = require("./logger");

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
  logger(`UTILS / RESPONSEBUILDER - Inside response builder`);
  return new ResponseBuilder(data, message, code).build();
}

module.exports = { responseBuilder };
