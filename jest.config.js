module.exports = {
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
    "setupFiles": [
      "<rootDir>/src/tests/setupTests.js"
    ],
    "moduleFileExtensions": ["js", "jsx", "ts", "tsx"],
    transform: {
      "^.+\\.(js|jsx|mjs)$": "<rootDir>/jest/transform.js"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]
  // "transform": {
  //     "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  // }
}
