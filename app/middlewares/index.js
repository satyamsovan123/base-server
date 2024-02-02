const { verifyJWT } = require("./verifyJWT");
const {
  verifyAuthenticationDataRequest,
} = require("./verifyAuthenticationRequest");
const { verifyAddDataRequest } = require("./verifyAddDataRequest");
const { verifyUpdateDataRequest } = require("./verifyUpdateDataRequest");
const { verifyGetByIdRequest } = require("./verifyGetByIdRequest");
const { verifyProcessOTPRequest } = require("./verifyProcessOTPRequest");

module.exports = {
  verifyJWT,
  verifyGetByIdRequest,
  verifyAddDataRequest,
  verifyAuthenticationDataRequest,
  verifyUpdateDataRequest,
  verifyProcessOTPRequest,
};
