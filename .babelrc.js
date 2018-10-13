const env = process.env.NODE_ENV;

if (env === 'production') {
  module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
      '@babel/plugin-proposal-optional-chaining'
    ],
  };
} else if (env === 'development') {
  module.exports = {
    plugins: [
      '@babel/plugin-proposal-optional-chaining'
    ],
  };
}