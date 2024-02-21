const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../constants");
const { User } = require("../../models");
const { excryptPlainText, generateJWT } = require("../../../utils");

const signUp = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / SIGNUP - Inside sign up`);

    const userData = req.body;
    logger(`INFO`, `CONTROLLERS / SIGNUP - User - ${userData.email}`);
    const encryptedPassword = await excryptPlainText(userData.password);
    const newUser = new User({
      email: userData.email,
      password: encryptedPassword,
    });

    await User.create(newUser);
    logger(`INFO`, `CONTROLLERS / SIGNUP - User created`);

    const token = await generateJWT({ email: userData.email });
    if (!token) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.SIGN_IN_ERROR,
        statusCodeConstant.ERROR
      );
      logger(`INFO`, `CONTROLLERS / SIGNIN - Error while generating JWT`);
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_UP_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(`INFO`, `CONTROLLERS / SIGNUP - User signed up successfully`);
    return res
      .cookie(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer-${token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_UP_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / SIGNUP - Error while signing up \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signUp };
