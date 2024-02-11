const dotenv = require("dotenv");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.prod" });
} else {
  dotenv.config({ path: ".env.dev" });
}

let appConfig = {
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
  appVersion: "1.0",
  emailServer: process.env.EMAIL_SERVER,
  emailServerAPIKey: process.env.EMAIL_SERVER_API_KEY,
  emailServerUsername: process.env.REGISTERED_EMAIL,
  testEmail: process.env.TEST_EMAIL,
  cronJobFrequency: process.env.CRON_JOB_FREQUENCY.toString(),
  useRateLimiter: JSON.parse(process.env.USE_RATE_LIMITER) === true,
  requestsPerMinute: JSON.parse(process.env.REQUESTS_PER_MINUTE),
};

module.exports = { appConfig };
