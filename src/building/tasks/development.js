import config             from '../config'
import output             from '../output'
import forever            from 'gulp-forever-monitor'
import devServer          from 'webpack-dev-server'
import webpack            from 'webpack'

const development = {
  server,
  frontend,
  backend
};

const frontendConfig = config({
  entry: ['webpack-dev-server/client?http://localhost:3030/', 'webpack/hot/dev-server', './src/client.js'],
  output: {
    path:  '/public/',
    filename: 'client.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "Tether": "tether", "window.Tether": "tether"}),
  ],
  externals: [],
  module: {
    loaders: [
      {
          test: /\.s?css$/,
          loaders: ['style', 'css', 'sass']
      }
    ]
  }
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
  }
});

function server() {
  const foreverOptions = {
    env: process.env,
    args: process.argv,
    watch: true,
    watchIgnorePatterns:  ['.*', 'node_modules/**', 'public/**', "app/**", "config/**", "public/**", "src/**"],
    silent: true
  };
  forever('build/server.js', foreverOptions)
  .on('watch:restart', fileInfo => {
    output('Server (re)started');
  })
}

function frontend(done) {
  const compiler = webpack(frontendConfig);
  new devServer(compiler, {
    hot: true,
    quiet: true,
    noInfo: true
  }).listen(3030, "localhost", err => {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      done();
  });
}

function backend() {
  webpack(backendConfig).watch(100, (err, stats) => {
    output()(err, stats)
  });
}

export default development;
