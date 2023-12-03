module.exports = {
  extends: [
    '../../.eslintrc.js',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
};
