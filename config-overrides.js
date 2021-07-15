// eslint-disable-next-line no-undef
const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@pages": "src/pages",
    "@components": "src/components",
    "@utils": "src/utils",
    "@context": "src/context",
    "@assets": "src/assets",
  })(config);

  return config;
};
