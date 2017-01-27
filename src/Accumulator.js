'use strict';

import {Transform} from 'stream';

class Accumulator extends Transform {
  static accumulate(options) {
    return new Accumulator(options);
  }

  constructor(options) {
    super(options);
    if (typeof this._charge !== 'function') {
      throw new Error('Method _charge is not defined');
    }
    if (typeof this._release !== 'function') {
      throw new Error('Method _release is not defined');
    }
  }
  end(chunk, encoding, next) {
    if (chunk !== null && typeof chunk !== 'undefined') {
      this._charge(chunk, encoding, (error, data) => {
        if (error) {
          throw error;
        }
        this.push(this._release());
        super.end(data, encoding, next);
      });
    } else {
      this.push(this._release());
      return super.end(chunk, encoding, next);
    }
  }

  _transform(chunk, encoding, next) {
    this._charge(chunk, encoding, next);
  }

}

export default Accumulator;