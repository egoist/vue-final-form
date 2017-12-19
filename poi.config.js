const path = require('path')

module.exports = {
  entry: 'example/index.js',
  dist: 'example/dist',
  homepage: '/',
  extendWebpack(config) {
    config.resolve
      .alias
      .set('vue-finalform$', path.resolve('src/index.js'))
  }
}
