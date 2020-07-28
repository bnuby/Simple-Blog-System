const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * 
 * @param {*} options 
 * 
 * @return 
 */
module.exports = function (options) {

  return {
    ...options,
    entry: ['webpack/hot/poll?1000', options.entry],
    watch: true,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?1000'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new TsconfigPathsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
};