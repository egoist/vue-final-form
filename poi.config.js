const path = require('path')

module.exports = {
  entry: 'example/index.js',
  dist: 'example/dist',
  homepage: '/',
  extendWebpack(config) {
    config.resolve
      .alias
      .set('vue-final-form$', path.resolve('src/index.js'))
  }
}
