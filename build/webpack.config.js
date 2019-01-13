const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src_js/index.js",
  output: {
    path: path.resolve("./dist"),
    filename: "index.js",
    library: "assistant",
    libraryTarget: "umd"
  },
  target: "node",
};