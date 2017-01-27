'use strict';

import {Transform} from 'stream';

class Filter extends Transform {
  constructor(options) {
    super(options);
    if (typeof this._filter !== 'function') {
      throw new Error('Method _filter is not defined');
    }
  }
  _transform(data, enc, next) {
    if (this._filter(data, enc)) {
      next(null, data);
    } else {
      next();
    }
  }
}

export default Filter;