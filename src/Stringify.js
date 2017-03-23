import Concat from './Concat';
/**
 * Collects stream data and converts it to string
 * @module Stringify
 * @example
 * import { stringify } from 'ex-stream/Stringify';
 * import { log } from 'ex-stream/LogStream';
 *
 * const inputStream = stringify();
 * inputStream.pipe(log()); // 'abcde'
 *
 * inputStream.write('a');
 * inputStream.write('b');
 * inputStream.write('c');
 * inputStream.write('d');
 * inputStream.end('e');
 */
export default class Stringify extends Concat {
  /**
   * @param {Object} options - Stream options
   * @example <caption>Creates Stringify stream instance</caption>
   *  new Stringify();
   */
  constructor(options) {
    super({...options, init: ''});
  }

  /**
   * @private
   */
  _concat(result, chunk) {
    return result + chunk.toString();
  }
}
/**
 * Stringify factory function
 *
 * @param {Object} options
 * @returns {Stringify}
 */
export function stringify(options) {
  return new Stringify(options);
}
