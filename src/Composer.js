'use strict';

import {Transform, PassThrough} from 'stream';

const _representative = Symbol('Composer representative');

class Composer extends Transform {
  constructor({streams, ...options}) {
    super(options);
    this[_representative] = new PassThrough(options);
    streams
      .reduce((source, Target) => source.pipe(new Target()), this)
      .pipe(this[_representative]);
  }

  pipe(stream) {
    return this[_representative].pipe(stream);
  }

  unpipe(stream) {
    return this[_representative].unpipe(stream);
  }
}

export default Composer;