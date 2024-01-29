const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../constants");

const { compareEncryptedText, generateJWT } = require("../../../utils");

const signIn = async (req, res) => {
  try {
    logger(["CONTROLLER: Inside sign in"]);
    const userData = req.body;
    const isPasswordValid = await compareEncryptedText(
      userData.password,
      userData.hashedPassword
    );
    if (!isPasswordValid) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.PROVIDE_VALID_CREDENTIALS,
        statusCodeConstant.UNAUTHORIZED
      );
      logger(["CONTROLLER: Password invalid", error]);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const token = await generateJWT({ email: userData.email });
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_IN_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(["CONTROLLER: Signed in successfully", userData]);
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_IN_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["CONTROLLER: Error while signing in", error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signIn };
