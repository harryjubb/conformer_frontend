/* config-overrides.js */
const webpack = require('webpack')

module.exports = function override (config, env) {
  config.plugins.push(
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      $: 'jquery',
      jQuery: 'jquery'
    }))

  return config
}
