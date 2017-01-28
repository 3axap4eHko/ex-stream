'use strict';

import {Transform} from 'stream';

const _filter = Symbol('filter');

class Filter extends Transform {
  static filter(options) {
    return new Filter(options);
  }
  constructor({filter, ...options}) {
    super(options);
    if (typeof filter !== 'function') {
      throw new Error('function filter is not defined in options');
    }
    this[_filter] = filter;
  }
  _transform(data, enc, next) {
    if (this[_filter](data, enc)) {
      next(null, data);
    } else {
      next();
    }
  }
}

export default Filter;