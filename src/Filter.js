import { Transform } from 'stream';

const _filter = Symbol('filter');
/**
 * Filter stream data by filter callback
 * @module Filter
 * @example
 * import { filter } from 'ex-stream/Filter';
 * import { log } from 'ex-stream/LogStream';
 *
 * const filterStream = filter({
 *    filter(value) {
 *      return /test/.test(value);
 *    }
 * });
 *
 * filterStream
 *  .pipe(log()); // 'any string'
 *
 * filterStream.write('testing');
 * filterStream.write('untest');
 * filterStream.end('any string');
 */
export default class Filter extends Transform {
  /**
   * @param {Function} filter - function that returns bool
   * @param {Object} options - Stream options
   * @example <caption>Creates Filter stream instance</caption>
   *
   *  new Filter({
   *    filter(data) {
   *      // ...
   *    }
   *  })
   */
  constructor({ filter, ...options }) {
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
/**
 * Filter stream factory function
 * @param {Object} options
 * @returns {Filter}
 */
export function filter(options) {
  return new Filter(options);
}
