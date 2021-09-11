const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common.js");

const getLib = (lib) => {
  if (lib) {
    return require(`./webpack.${lib}.js`);
  } else {
    return {
    };
  }
};

module.exports = ({ env, lib }) => {
  const envConfig = require(`./webpack.${env}.js`);

  return merge(commonConfig, envConfig, getLib(lib));
};
