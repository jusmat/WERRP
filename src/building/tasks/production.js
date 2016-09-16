/*eslint no-undef: "error"*/
/*eslint-env node*/

import config     from '../config'
import output     from '../output'
import webpack    from 'webpack'
import forever    from 'gulp-forever-monitor'
import ExtractTextPlugin  from 'extract-text-webpack-plugin'

const production = {
  server,
  frontend,
  backend
};

const frontendConfig = config({
  entry: './src/client.js',
  output: {
    path: './public/',
    filename: 'client.js'
  },
  plugins: [
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "Tether": "tether", "window.Tether": "tether"}),
    new ExtractTextPlugin('./style.css', { allChunks: true })
  ],
  module: {
    loaders: [
      {
          test: /\.s?css$/,
          loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  externals: []
});

const backendConfig = config({
  entry: './src/server.js',
  target: 'node',
  output: {
    path: './build/',
    filename: 'server.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ]
});

function server() {
  forever('build/server.js', { env: process.env, args: process.argv })
}

function frontend(done) {
  webpack(frontendConfig).run(output(done));
}

function backend(done) {
  webpack(backendConfig).run(output(done));
}

export default production;
