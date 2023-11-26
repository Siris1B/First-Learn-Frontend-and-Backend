const eslintDefault = require('../../.eslintrc.mjs');
module.exports = {
  extends: ['../../.eslintrc.js'],
  env: {
    node: true,
    es2022: true,
    ...eslintDefault.env,
  },
  rules: {
    'no-console': 'warn',
    ...eslintDefault.rules,
  },
  parserOptions: {
    // ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
