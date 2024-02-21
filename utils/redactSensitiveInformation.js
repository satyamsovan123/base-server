const { logger } = require("./logger");

function redactSensitiveInformation(data) {
  logger(
    `INFO`,
    `UTILS / REDACTSENSITIVEINFORMATION - Inside redact sensitive information`
  );
  const hiddenCharacters = "-----";
  const redactedData = { ...data };

  if (redactedData.password) {
    redactedData.password = `${hiddenCharacters}${redactedData.password.slice(
      -4
    )}`;
  }

  if (redactedData.otp) {
    redactedData.otp = `${hiddenCharacters}${redactedData.otp.slice(-4)}`;
  }

  if (redactedData.email) {
    redactedData.email = `${hiddenCharacters}@${
      redactedData.email.split("@")[1]
    }`;
  }

  if (redactedData.sender) {
    redactedData.sender = `${hiddenCharacters}@${
      redactedData.sender.split("@")[1]
    }`;
  }

  if (redactedData.receiver) {
    redactedData.receiver = `${hiddenCharacters}@${
      redactedData.receiver.split("@")[1]
    }`;
  }

  if (redactedData.token) {
    redactedData.token = `${hiddenCharacters}${redactedData.token.slice(-4)}`;
  }

  return JSON.stringify(redactedData);
}

module.exports = { redactSensitiveInformation };
