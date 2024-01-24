const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const { verifyAuthenticationDataRequest } = require("../middlewares");

router.post("/signup", verifyAuthenticationDataRequest, signUp);
router.post("/signin", verifyAuthenticationDataRequest, signIn);

module.exports = router;
