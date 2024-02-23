const Joi = require("joi");
const { appConstant, responseConstant } = require("../../constants");
const { logger } = require("../../utils/logger");

class UpdateDataValidator {
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
        .min(12)
        .required()
        .messages({
          "string.empty": `${appConstant.ID} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${appConstant.ID} ${responseConstant.SHOULD_HAVE} at least {#limit} characters. ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.ID} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
      title: Joi.string()
        .min(1)
        .max(80)
        .required()
        .custom((value, helpers) => {
          const trimmedValue = value.trim();
          if (trimmedValue.length === 0) {
            return helpers.error("string.empty");
          }
          return trimmedValue;
        }, "string with only spaces validation")
        .messages({
          "string.empty": `${appConstant.TITLE} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${appConstant.TITLE} ${responseConstant.SHOULD_HAVE} at least {#limit} characters.  ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.max": `${appConstant.TITLE} ${responseConstant.SHOULD_HAVE} at most {#limit} characters. ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.TITLE} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
      article: Joi.string()
        .min(20)
        .required()
        .custom((value, helpers) => {
          const trimmedValue = value.trim();
          if (trimmedValue.length === 0) {
            return helpers.error("string.empty");
          }
          return trimmedValue;
        }, "string with only spaces validation")
        .messages({
          "string.empty": `${appConstant.ARTICLE} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${appConstant.ARTICLE} ${responseConstant.SHOULD_HAVE} at least {#limit} characters. ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.ARTICLE} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
      fileUrls: Joi.alternatives().try(
        Joi.array().items(Joi.string().allow("")).allow(""),
        Joi.string().allow("")
      ),
    }).messages({
      "object.unknown": `${responseConstant.REDUNDANT_DATA}`,
    });
    this.validationResult = this.validatorSchema.validateAsync(data);
  }

  async getValidationResult() {
    try {
      await this.validationResult;
    } catch (error) {
      return error?.message ?? responseConstant.ERROR_OCCURRED_WHILE_VERIFYING;
    }
  }
}

module.exports = { UpdateDataValidator };
