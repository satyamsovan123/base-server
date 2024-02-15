const { logger } = require("./logger");

const topDelimeter = "_";
const rightDelimeter = "|";
const leftDelimeter = "|";
const bottomDelimeter = "-";

function overengineedBoxifier(messages) {
  logger(`INFO`, `UTILS / OVERENGINEEDBOXIFIER - Inside overengineed boxifier`);
  let hightestLengthOfMessage = 0;
  messages.forEach((message) => {
    if (message.length > hightestLengthOfMessage) {
      hightestLengthOfMessage = message.length;
    }
  });
  console.log(`${topDelimeter} `.repeat(hightestLengthOfMessage / 2 + 4));
  messages.forEach((message) => {
    console.log(
      `${rightDelimeter}  ${message} ${" ".repeat(
        hightestLengthOfMessage - message.length
      )} ${leftDelimeter}`
    );
  });
  console.log(`${bottomDelimeter} `.repeat(hightestLengthOfMessage / 2 + 4));
}

module.exports = { overengineedBoxifier };
