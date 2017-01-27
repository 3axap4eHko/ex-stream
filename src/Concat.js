'use strict';

import Reducer from './Reducer';

class Concat extends Reducer {
  static concat(options) {
    return new Concat(options);
  }
  _reduce(result, chunk, enc, next) {
    next(null, result + chunk);
  }
}

export default Concat;