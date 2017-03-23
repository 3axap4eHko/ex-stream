import Filter from './Filter';
/**
 * Filter stream data by RegExp
 * @module FilterRegexp
 * @example
 * import { filter } from 'ex-stream/FilterRegexp';
 * import { log } from 'ex-stream/LogStream';
 *
 * const filterStream = filter({
 *    regexp: /test/
 * });
 *
 * filterStream
 *  .pipe(log()); // 'any string'
 *
 * filterStream.write('testing');
 * filterStream.write('untest');
 * filterStream.end('any string');
 */
export default class FilterRegexp extends Filter {
  /**
   *
   * @param {RegExp} regexp
   * @param {Object} options
   * @example <caption>Creates FilterRegexp stream instance</caption>
   *
   *  new FilterRegexp({
   *    regexp: /^\w+$/
   *  })
   */
  constructor({ regexp, ...options }) {
    super({ filter: value => regexp.test(value), ...options });
  }
}
/**
 * FilterRegexp stream factory function
 * @param options
 * @returns {FilterRegexp}
 */
export function filter(options) {
  return new FilterRegexp(options);
}
