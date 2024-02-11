const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const { signOut } = require("../controllers/authentication/signOut");
const {
  verifyAuthenticationDataRequest,
  verifyProcessOTPVerificationRequest,
} = require("../middlewares");
const { processOTPVerification } = require("../controllers");

router.post("/signup", verifyAuthenticationDataRequest, signUp);
router.post("/signin", verifyAuthenticationDataRequest, signIn);
router.post(
  "/processOTPVerification",
  verifyProcessOTPVerificationRequest,
  processOTPVerification
);
router.get("/signout", signOut);

module.exports = router;
