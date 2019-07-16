module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-jsx', 'prettier/flowtype', 'prettier'],
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  globals: {
    // for Jest
    test: false,
    expect: false,
    describe: false,
    it: false,
    cancelAnimationFrame: false,
    requestAnimationFrame: false,
    fetch: false,
    __DEV__: false,
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
}
