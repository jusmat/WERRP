import fs             from 'fs'
import DeepMerge      from 'deep-merge'

const deepmerge = DeepMerge((target, source, key) => {
  if(target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const defaultConfig = {
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel?presets[]=es2015,presets[]=react'] },
    ],
  },
  externals: nodeModules
};

if(process.env.NODE_ENV !== 'production') {
  defaultConfig.devtool = '#eval-source-map';
  defaultConfig.debug = true;
}


export default function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}
