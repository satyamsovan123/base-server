const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const { signOut } = require("../controllers/authentication/signOut");
const {
  verifyAuthenticationDataRequest,
  verifyProcessOTPVerificationRequest,
  verifyJWT,
} = require("../middlewares");
const { processOTPVerification, deleteAccount } = require("../controllers");

router.post("/signup", verifyAuthenticationDataRequest, signUp);
router.post("/signin", verifyAuthenticationDataRequest, signIn);
router.post(
  "/processotpverification",
  verifyProcessOTPVerificationRequest,
  processOTPVerification
);
router.get("/signout", signOut);
router.delete("/deleteaccount", verifyJWT, deleteAccount);

module.exports = router;
