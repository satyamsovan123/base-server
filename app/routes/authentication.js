const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");

const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const {
  verifyAuthenticationDataRequest,
  verifyProcessOTPVerificationRequest,
} = require("../middlewares");
const { processOTPVerification } = require("../controllers");

router.post(
  "/signup",
  trimRequest.all,
  verifyAuthenticationDataRequest,
  signUp
);
router.post(
  "/signin",
  trimRequest.all,
  verifyAuthenticationDataRequest,
  signIn
);
router.post(
  "/processOTPVerification",
  trimRequest.all,
  verifyProcessOTPVerificationRequest,
  processOTPVerification
);

module.exports = router;
