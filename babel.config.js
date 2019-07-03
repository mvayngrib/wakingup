module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './',
          alias: {
            '#': './modules',
            '~': './',
            images: './assets/images/png',
            components: './components',
            screens: './screens',
            '~/constants/prop-types': './constants/prop-types',
          },
        },
      ],
    ],
  }
}
