module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-jsx', 'prettier/flowtype', 'prettier'],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
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
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
}
