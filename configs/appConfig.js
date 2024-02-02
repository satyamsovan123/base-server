const dotenv = require("dotenv");
require("dotenv").config();
const fs = require("fs").promises;

let appVersion = "1.0";
fs.readFile("VERSION", "utf8", (err, data) => {
  if (err) {
    return;
  }
  const majorVersion = data.split("\n")[0].split("=")[1];
  const minorVersion = data.split("\n")[1].split("=")[1];
  appVersion = `${majorVersion}.${minorVersion}`;
});

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.prod" });
} else {
  dotenv.config({ path: ".env.dev" });
}

const appConfig = {
  appName: process.env.APP_NAME,
  frontendURL: process.env.FRONTEND_URL,
  backendURL: process.env.BACKEND_URL,
  environment: process.env.NODE_ENV,
  port: JSON.parse(process.env.PORT),
  databaseURL: process.env.DATABASE_URL,
  databaseName: process.env.DATABASE_NAME,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  bcryptSaltRounds: JSON.parse(process.env.BCRYPT_SALT_ROUNDS),
  expiresAfterMinutes: JSON.parse(process.env.EXPIRES_AFTER_MINUTES || 1),
  appVersion: appVersion,
  emailServer: process.env.EMAIL_SERVER,
  emailServerAPIKey: process.env.EMAIL_SERVER_API_KEY,
  emailServerUsername: process.env.REGISTERED_EMAIL,
  verifyOtpURL: process.env.VERIFY_OTP_URL,
};

module.exports = { appConfig };
