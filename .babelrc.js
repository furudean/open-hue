const env = process.env.NODE_ENV;

const overrides = [];

if (env === 'development') {
  overrides.push({
    presets: [],
  });
}

module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    '@babel/plugin-proposal-optional-chaining'
  ],
  overrides,
};