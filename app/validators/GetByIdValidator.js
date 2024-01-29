const Joi = require("joi");
const { appConstant, responseConstant } = require("../../constants");
const { logger } = require("../../utils/logger");

class GetByIdValidator {
  constructor(data = {}) {
    this.data = data;
    this.validatorSchema = Joi.object({
      email: Joi.string()
        .email()
        .min(1)
        .required()
        .messages({
          "string.email": `${appConstant.EMAIL} ${responseConstant.IS_INVALID} ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.empty": `${appConstant.EMAIL} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.EMAIL} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
      id: Joi.string()
        .length(24)
        .required()
        .messages({
          "string.empty": `${appConstant.ID} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.length": `${appConstant.ID} ${responseConstant.SHOULD_HAVE} {#limit} characters. ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.ID} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
    }).messages({
      "object.unknown": `${responseConstant.REDUNDANT_DATA}`,
    });
    this.validationResult = this.validatorSchema.validateAsync(data);
  }

  async getValidationResult() {
    try {
      await this.validationResult;
    } catch (error) {
      logger(["VALIDATOR: Error while validating get by id request", error]);
      return error?.message ?? responseConstant.ERROR_OCCURRED_WHILE_VERIFYING;
    }
  }
}

module.exports = { GetByIdValidator };
