/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transformIgnorePatterns: [
        "node_modules/(?!(react-native|react-native-cookies)/)"
      ],
      moduleNameMapper: {
        '^react-native$': 'react-native-web',
      }
  };
  
  module.exports = config;