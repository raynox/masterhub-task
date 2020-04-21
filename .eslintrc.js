module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    "react-native/react-native": true
  },
  extends: [
    "airbnb", "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    "react",
    "react-native",
    "prettier"
  ],
  rules: {
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    "no-use-before-define": ["off"],
    "import/prefer-default-export": ["off"],
    "react/jsx-closing-tag-location": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "react/forbid-prop-types": ["off"],
  },
};
