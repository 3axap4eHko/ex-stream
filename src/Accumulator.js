import { Transform } from 'stream';
/**
 * Accumulate stream data by charging and release it on stream finish
 * @module Accumulator
 * @example
 * class MyStream extends Accumulator {
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
 * const accumulator = new MyStream();
 * accumulator.on('data', data => console.log(data)); // 'abcdefg'
 * accumulator.write('a');
 * accumulator.write('b');
 * accumulator.write('c');
 * accumulator.write('d');
 * accumulator.write('e');
 * accumulator.write('f');
 * accumulator.end('g');
 */
export default class Accumulator extends Transform {
  /**
   * @param {Object} options Stream options
   */
  constructor(options) {
    super(options);
  }

  /**
   * Charging stream
   *
   * @abstract
   * @param {any} data
   * @param {String} encoding
   * @param {Function} next
   */
  _charge(data, encoding, next) { // eslint-disable-line no-unused-vars
    throw new Error('Method _charge is abstract');
  }

  /**
   * Release charged data
   *
   * @abstract
   * @returns {*}
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
