const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../constants");

const signOut = async (req, res) => {
  try {
    logger(`INFO`, `CONTROLLERS / SIGNOUT - Inside sign out`);
    logger(`INFO`, `CONTROLLERS / SIGNOUT - User - ${userData.email}`);
    const token = "";

    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_OUT_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    return res
      .cookie(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer-${token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: new Date(),
      })
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_OUT_ERROR,
      statusCodeConstant.ERROR
    );
    logger(
      `ERROR`,
      `CONTROLLERS / SIGNOUT - Error while signing out \n Error - ${error}`
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signOut };
