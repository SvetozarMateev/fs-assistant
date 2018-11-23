const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src_js/index.js",
  output: {
    path: path.resolve("./dist"),
    filename: "index.js",
    library: "fs-assistant",
    libraryTarget: "umd2"
  },
  target: "node",
};