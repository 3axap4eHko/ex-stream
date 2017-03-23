import Accumulator from './Accumulator';

const _result = Symbol('Reducer result');
/**
 * Reduce stream data
 * @module Reducer
 * @example
 * import Reducer from 'ex-stream/Reducer';
 * import { log } from 'ex-stream/LogStream';
 *
 * class SumStream extends from Reducer {
 *    constructor() {
 *      super({ init: 0 });
 *    }
 *    _reduce(result, value, enc, next) {
 *      next(null, result + parseInt(value));
 *    }
 * }
 *
 * const sumStream = new SumStream();
 * sumStream.pipe(log()); // 5
 *
 * sumStream.write(1);
 * sumStream.write(1);
 * sumStream.write(1);
 * sumStream.write(1);
 * sumStream.end(1);
 *
 */
export default class Reducer extends Accumulator {
  /**
   *
   * @param {*} init - reducer init value
   * @param {Object} options
   * @example <caption>Class is abstract</caption>
   */
  constructor({ init, ...options } = {}) {
    super(options);
    this[_result] = init;
  }

  /**
   * Reduce stream data
   *
   * @param {*} result - reduced data
   * @param {*} data - data to reduce
   * @param {String} enc - data encoding to reduce
   * @param {Function} next
   * @returns {*} - result of reducing
   */
  _reduce(result, data, enc, next) { // eslint-disable-line no-unused-vars
    throw new Error('Method _reduce is abstract');
  }

  /**
   * @private
   */
  _release() {
    try {
      return this[_result];
    } finally {
      delete this[_result];
    }
  }

  /**
   * @private
   */
  _charge(chunk, encoding, next) {
    if (typeof this[_result] === 'undefined') {
      this[_result] = chunk;
      next();
    } else {
      this._reduce(this[_result], chunk, encoding, (error, result) => {
        this[_result] = result;
        next(error);
      });
    }
  }
}
