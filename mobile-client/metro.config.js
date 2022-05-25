const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
exports.transformer = {
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
},
exports.resolver = {
  ...defaultResolver,
  assetExts: defaultResolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [
    ...defaultResolver.sourceExts,
    "cjs",
    "svg"
  ],
};