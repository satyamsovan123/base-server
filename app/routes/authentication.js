const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const {
  verifyAuthenticationDataRequest,
  verifyProcessOTPRequest,
} = require("../middlewares");
const { processOTP } = require("../controllers");

router.post("/signup", verifyAuthenticationDataRequest, signUp);
router.post("/signin", verifyAuthenticationDataRequest, signIn);
router.post("/processOTP", verifyProcessOTPRequest, processOTP);

module.exports = router;
