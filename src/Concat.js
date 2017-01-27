'use strict';

import Accumulator from './Accumulator';

const _data = Symbol('data');

class Concat extends Accumulator {
  static concat(options) {
    return new Concat(options);
  }
  constructor(options) {
    super(options);

      if (typeof this._concat !== 'function') {
          throw new Error('Method _concat is not defined');
      }
  }
  _charge(chunk, enc, next) {
    this[_data] = this._concat(this[_data], chunk, enc);
    next();
  }
  _release() {
    try {
      return this[_data];
    } finally {
      delete this[_data];
    }
  }
}

export default Concat;