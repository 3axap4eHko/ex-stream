'use strict';

import Reducer from './Reducer';

class Concat extends Reducer {
  constructor(options) {
    super(options);
    if (typeof this._concat !== 'function') {
      throw new Error('Method _concat is not defined');
    }
  }

  _reduce(result, chunk, enc, next) {
    next(null, this._concat(result, chunk, enc));
  }
}

export default Concat;