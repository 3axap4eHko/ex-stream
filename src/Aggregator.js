'use strict';

import {Transform} from 'stream';

const _result = Symbol('Aggregator result');

class Aggregator extends Transform {
  static aggregate(options) {
    return new Aggregator(options);
  }
  constructor(options) {
    super(options);
    if (typeof this._aggregate !== 'function') {
      throw new Error('_aggregate not defined');
    }

    this[_result] = null;
  }
  _transform(chunk, encoding, next) {
    if (this[_result] !== null) {
      this._aggregate(this[_result], chunk, encoding, (error, result) => {
        this.push(this[_result] = result);
        next(error);
      });
    } else {
      this[_result] = chunk;
      next();
    }
  }
}

module.exports = Aggregator;