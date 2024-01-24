function overengineedBoxifier(messages) {
  let hightestLengthOfMessage = 0;
  messages.forEach((message) => {
    if (message.length > hightestLengthOfMessage) {
      hightestLengthOfMessage = message.length;
    }
  });

  console.log("- ".repeat(hightestLengthOfMessage / 2 + 3));
  messages.forEach((message) => {
    console.log(
      `- ${message} ${" ".repeat(hightestLengthOfMessage - message.length)} -`
    );
  });
  console.log("- ".repeat(hightestLengthOfMessage / 2 + 3));
}

module.exports = { overengineedBoxifier };
