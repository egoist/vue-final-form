const path = require('path')

module.exports = {
  entry: 'example/index.js',
  output: {
    dir: 'example/dist'
  },
  chainWebpack(config) {
    config.resolve
      .alias
      .set('vue-final-form$', path.resolve('src/index.js'))
  }
}
