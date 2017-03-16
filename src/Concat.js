import Reducer from './Reducer';
/**
 * Concatenate stream data by `_concat` function
 * @module Concat
 */
export default class Concat extends Reducer {
  /**
   *
   * @param {Object} options stream options
   */
  constructor(options) {
    super(options);
  }

  /**
   * Stream data concatenation method
   *
   * @abstract
   * @param {any} result
   * @param {any} data
   * @param {String} enc
   * @returns {any}
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
