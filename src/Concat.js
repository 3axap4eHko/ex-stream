import Reducer from './Reducer';
/**
 * Concatenate stream data by `_concat` function
 * @module Concat
 * @abstract
 * @example
 * import Concat from 'ex-stream/Concat';
 * import { log } from 'ex-stream/LogStream';
 *
 * class ConcatArray extends Concat {
 *  constructor(options) {
 *    super({init: [], options});
 *  }
 *  _concat(result, chunk, enc) {
 *    return result.concat([chunk]);
 *  }
 * }
 *
 * const concatArray = new ConcatArray();
 * concatArray.pipe(log()); // [1,2,3,4,5]
 * concatArray.write(1);
 * concatArray.write(2);
 * concatArray.write(3);
 * concatArray.write(4);
 * concatArray.end(5);
 *
 * class ConcatString extends Concat {
 *  constructor(options) {
 *    super({init: '', options});
 *  }
 *  _concat(result, chunk, enc) {
 *    return result + chunk;
 *  }
 * }
 *
 * const concatString = new ConcatString();
 * concatString.pipe(log()); // 'abcde'
 * concatString.write('a');
 * concatString.write('b');
 * concatString.write('c');
 * concatString.write('d');
 * concatString.end('e');
 */
export default class Concat extends Reducer {
  /**
   *
   * @param {Object} options - Stream options
   * @example <caption>Class is abstract</caption>
   */
  constructor(options) {
    super(options);
  }

  /**
   * Stream data concatenation method
   *
   * @abstract
   * @param {*} result - result of concatenation
   * @param {*} data - data for concatenation
   * @param {String} enc - data encoding for concatenation
   * @returns {*} - result of concatenation
   */
  _concat(result, data, enc) { // eslint-disable-line no-unused-vars
    throw new Error('Method _concat is abstract');
  }

  /**
   * @private
   */
  _reduce(result, chunk, enc, next) {
    next(null, this._concat(result, chunk, enc));
  }
}
