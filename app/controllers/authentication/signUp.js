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
    const userData = req.body;

    const encryptedPassword = await excryptPlainText(userData.password);
    const newUser = new User({
      email: userData.email,
      password: encryptedPassword,
    });
    await User.create(newUser);

    const token = await generateJWT({ email: userData.email });
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_UP_SUCCESS,
      statusCodeConstant.SUCCESS
    );
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
    logger(["signup", generatedResponse, error]);

    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signUp };
