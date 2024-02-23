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
  emailServerURL: process.env.EMAIL_SERVER_URL,
  emailServerAPIKey: process.env.EMAIL_SERVER_API_KEY,
  emailServerUsername: process.env.REGISTERED_EMAIL,
  testEmail: process.env.TEST_EMAIL,
  cronJobFrequency: process.env.CRON_JOB_FREQUENCY.toString(),
  useRateLimiter: JSON.parse(process.env.USE_RATE_LIMITER) === true,
  requestsPerMinute: JSON.parse(process.env.REQUESTS_PER_MINUTE),
  cloudStorageName: process.env.CLOUD_STORAGE_NAME,

  firebaseConfig: {
    documentBucketName: process.env.FIREBASE_DOCUMENT_BUCKET_NAME,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },

  textRazorAPIKey: process.env.TEXTRAZOR_API_KEY,
  profanityCheckerURL: process.env.PROFANITY_CHECKER_URL,
  profanityCheckerAPIKey: process.env.PROFANITY_CHECKER_API_KEY,
};

module.exports = { appConfig };
