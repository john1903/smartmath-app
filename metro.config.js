// const { getDefaultConfig } = require("expo/metro-config");

// const config = getDefaultConfig(__dirname);

// config.transformer.babelTransformerPath = require.resolve(
//   "react-native-svg-transformer"
// );
// config.resolver.assetExts = config.resolver.assetExts.filter(
//   (ext) => ext !== "svg"
// );
// config.resolver.sourceExts.push("svg");

// module.exports = config;

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { assetExts, sourceExts } = config.resolver;

  config.resolver.assetExts = assetExts.filter((ext) => ext !== "svg");
  config.resolver.sourceExts = [...sourceExts, "svg"];
  config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );

  return config;
})();
