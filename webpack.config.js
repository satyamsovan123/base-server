const path = require("path");

module.exports = {
  entry: "./app.js",
  target: "node",
  output: {
    filename: "bundled-server.js",
    path: path.resolve("dist"),
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.html$/, use: "raw-loader" },
      { test: /\.cs$/, use: "raw-loader" },
    ],
  },
  resolve: {
    fallback: {
      nock: false,
      "aws-sdk": false,
      "mock-aws-s3": false,
    },
  },
};
