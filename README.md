# ProblematorReact

## Steps to make the project work
    1.  When you create a new project, be sure to delete .babelrc which is created by default
    when you run react-native update. There's babel.config.js in stead.

    2.  You have to install React Native Navigation v2, and it needs some changes with XCode and Android Studio. https://wix.github.io/react-native-navigation/#/docs/Installing


# Tests will fail until you do this:

Going to the preprocessor.js file inside react-native jest folder, normally located in this path <rootDir>/node_modules/react-native/jest/preprocessor.js and
Change the inlineRequires: true to inlineRequires: false