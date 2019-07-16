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
            '~': './',
            images: './assets/images/png',
            components: './components',
            containers: './containers',
          },
        },
      ],
    ],
  }
}
