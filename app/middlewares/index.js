const { verifyJWT } = require("./verifyJWT");
const {
  verifyAuthenticationDataRequest,
} = require("./verifyAuthenticationRequest");
const { verifyAddDataRequest } = require("./verifyAddDataRequest");
const { verifyUpdateDataRequest } = require("./verifyUpdateDataRequest");
const { verifyGetByIdRequest } = require("./verifyGetByIdRequest");
const {
  verifyProcessOTPVerificationRequest,
} = require("./verifyProcessOTPVerificationRequest");
const rateLimiter = require("./rateLimiter");

module.exports = {
  rateLimiter,
  verifyJWT,
  verifyGetByIdRequest,
  verifyAddDataRequest,
  verifyAuthenticationDataRequest,
  verifyUpdateDataRequest,
  verifyProcessOTPVerificationRequest,
};
