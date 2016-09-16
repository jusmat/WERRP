import debugLib from 'debug'

const debug = debugLib('build');


const output = done => {
  if(typeof(done) == 'string') {
    debug(done)
  } else {
    return (err, stats) => {
      if(err) {
        debug('Error', err);
      }
      else {
        debug('Build successful');
      }

      if(done) {
        done();
      }
    }
  }
};

export default output;
