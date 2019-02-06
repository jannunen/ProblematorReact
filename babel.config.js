module.exports = function (api) {
  var env = api.cache(() => process.env.NODE_ENV);

  return {
    presets: ['module:metro-react-native-babel-preset', "module:react-native-dotenv"],
    env: {
      test: {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: 'commonjs',
                    debug: false
                }
            ],
            '@babel/preset-flow',
            '@babel/preset-react'
        ],
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties'
        ]
    },
    },
  }
}