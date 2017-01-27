'use strict';

import {Transform} from 'stream';

const _delegates = Symbol('List of delegates');

class Delegator extends Transform {
  static delegate(delegates) {
    return new Delegator(delegates);
  }
  constructor(delegates) {
    super({objectMode: true});
    this[_delegates] = delegates;
  }
  _transform({delegate, data}, enc, next) {
    this[_delegates][delegate](data, (error, result) => {
      next(error, result);
    });
  }
}

export default Delegator;