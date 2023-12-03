const eslintDefault = require('../../.eslintrc.js');

module.exports = {
  ...eslintDefault,
  rules: {
    'no-console': 'warn',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
