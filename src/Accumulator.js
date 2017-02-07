'use strict';

import {Transform} from 'stream';

class Accumulator extends Transform {

  constructor(options) {
    super(options);
    if (typeof this._charge !== 'function') {
      throw new Error('Method _charge is not defined');
    }
    if (typeof this._release !== 'function') {
      throw new Error('Method _release is not defined');
    }
  }

  _transform(chunk, encoding, next) {
    this._charge(chunk, encoding, next);
  }
  _flush(next) {
    this.push(this._release());
    next();
  }
}

export default Accumulator;