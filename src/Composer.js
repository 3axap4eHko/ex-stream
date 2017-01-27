'use strict';

import {Transform, PassThrough} from 'stream';

const _producer = Symbol('Composer producer');

class Composer extends Transform {
  constructor({streams, ...options}) {
    super(options);
    this[_producer] = new PassThrough(options);
    streams
      .reduce( (source, Target) => source.pipe(new Target()), this)
      .pipe(this[_producer]);
  }
  pipe(stream) {
    return this[_producer].pipe(stream);
  }
  unpipe(stream) {
    return this[_producer].unpipe(stream);
  }
}

export default Composer;