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
    logger(`CONTROLLERS / SIGNIN - Inside sign in`);

    const userData = req.body;
    logger(`CONTROLLERS / SIGNIN - User - ${userData.email}`);
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
      logger(`CONTROLLERS / SIGNIN - Password is not valid`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    logger(`CONTROLLERS / SIGNIN - Password is valid`);
    const token = await generateJWT({ email: userData.email });
    if (!token) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.SIGN_IN_ERROR,
        statusCodeConstant.ERROR
      );
      logger(`CONTROLLERS / SIGNIN - Error while generating JWT`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_IN_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`CONTROLLERS / SIGNIN - User signed in successfully`);
    return res
      .cookie("Bearer", `${token}`, {
        secure: true,
        // httpOnly: true,
        maxAge: 86400 * 1000,
      })
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_IN_ERROR,
      statusCodeConstant.ERROR
    );
    logger(`CONTROLLERS / SIGNIN - Error while signing in \n Error - ${error}`);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signIn };
