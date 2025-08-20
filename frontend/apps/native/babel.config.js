// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       // Required for expo-router
//       // require.resolve('expo-router/babel'),
//       // Add other plugins as needed
//       'react-native-reanimated/plugin', // Should be last if you're using reanimated
//     ],
//   };
// };


module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};