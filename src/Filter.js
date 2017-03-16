import {Transform} from 'stream';

const _filter = Symbol('filter');
/**
 * Filter stream data by filter callback
 * @module Filter
 */
export default class Filter extends Transform {
  /**
   * @param {Function} filter
   * @param {Object} options
   */
  constructor({filter, ...options}) {
    super(options);
    if (typeof filter !== 'function') {
      throw new Error('function filter is not defined in options');
    }
    this[_filter] = filter;
  }

  /**
   * @private
   */
  _transform(data, enc, next) {
    if (this[_filter](data, enc)) {
      next(null, data);
    } else {
      next();
    }
  }
}

export function filter(options) {
  return new Filter(options);
}
