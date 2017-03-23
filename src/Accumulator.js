import { Transform } from 'stream';
/**
 * Accumulate stream data by charging and release it on stream finish
 * @module Accumulator
 * @example
 * import Accumulator from 'ex-stream/Accumulator';
 * import { log } from 'ex-stream/LogStream';
 *
 * class Concat extends Accumulator {
 *    data = '';
 *   _charge(data, enc, next) {
 *      this.data += data;
 *      next();
 *   }
 *   _release() {
 *      try {
 *        return this.data
 *      } catch(e) {
 *        this.data = '';
 *      }
 *   }
 * }
 * const concat = new Concat();
 * concat.pipe(log()); // 'abcdefg'
 *
 * concat.write('a');
 * concat.write('b');
 * concat.write('c');
 * concat.write('d');
 * concat.write('e');
 * concat.write('f');
 * concat.end('g');
 */
export default class Accumulator extends Transform {
  /**
   * @param {Object} [options={}] - Stream options
   * @example <caption>Class is abstract</caption>
   */
  constructor(options) {
    super(options);
  }

  /**
   * Charging stream
   *
   * @abstract
   * @param {*} data - charged data
   * @param {String} encoding - data encoding
   * @param {Function} next - pass function
   */
  _charge(data, encoding, next) { // eslint-disable-line no-unused-vars
    throw new Error('Method _charge is abstract');
  }

  /**
   * Release charged data
   *
   * @abstract
   * @returns {*} - left data
   */
  _release() {
    throw new Error('Method _release is not defined');
  }
  /**
   * @private
   */
  _transform(chunk, encoding, next) {
    this._charge(chunk, encoding, next);
  }

  /**
   * @private
   */
  _flush(next) {
    this.push(this._release());
    next();
  }
}
