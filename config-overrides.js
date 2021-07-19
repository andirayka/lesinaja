/* eslint-disable no-undef */
const path = require("path");
const {
  override,
  addPostcssPlugins,
  addWebpackAlias,
} = require("customize-cra");

module.exports = override(
  addPostcssPlugins([require("tailwindcss")]),
  addWebpackAlias({
    "@pages": path.resolve(__dirname, "src/pages"),
    "@components": path.resolve(__dirname, "src/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@context": path.resolve(__dirname, "src/context"),
    "@assets": path.resolve(__dirname, "src/assets"),
  })
);
