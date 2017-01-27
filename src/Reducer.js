'use strict';

import {Transform, PassThrough} from 'stream';

const _producer = Symbol('Reducer producer');
const _result = Symbol('Reducer result');

class Reducer extends Transform {
  constructor(options) {
    super(options);
    if (typeof this._reduce !== 'function') {
      throw new Error('_reduce not defined');
    }

    this[_result] = null;
    this[_producer] = new PassThrough(options);
    this.on('finish', () => {
      this[_producer].end(this[_result]);
    });
  }
  pipe(stream) {
    return this[_producer].pipe(stream);
  }
  unpipe(stream) {
    return this[_producer].unpipe(stream);
  }
  _transform(chunk, encoding, next) {
    if (this[_result] !== null) {
      this._reduce(this[_result], chunk, encoding, (error, result) => {
        this[_result] = result;
        next(error);
      });
    } else {
      this[_result] = chunk;
      next();
    }
  }
}

module.exports = Reducer;