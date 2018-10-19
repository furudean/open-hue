const env = process.env.NODE_ENV;

if (env === 'production') {
  module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-async-to-generator',
      'es6-promise',
    ],
  };
} else if (env === 'development') {
  module.exports = {
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-async-to-generator',
    ],
  };
}