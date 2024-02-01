const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../constants");
const { User } = require("../../models");
const { excryptPlainText, generateJWT, sendOTP } = require("../../../utils");

const signUp = async (req, res) => {
  try {
    logger(`CONTROLLERS / SIGNUP - Inside sign up`);
    const userData = req.body;
    logger(`CONTROLLERS / SIGNUP - User - ${userData.email}`);
    const encryptedPassword = await excryptPlainText(userData.password);
    const newUser = new User({
      email: userData.email,
      password: encryptedPassword,
    });

    await User.create(newUser);
    logger(`CONTROLLERS / SIGNUP - User created`);

    const token = await generateJWT({ email: userData.email });
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_UP_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`CONTROLLERS / SIGNUP - User signed up successfully`);
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_UP_ERROR,
      statusCodeConstant.ERROR
    );
    logger(`CONTROLLERS / SIGNUP - Error while signing up \n Error - ${error}`);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signUp };
