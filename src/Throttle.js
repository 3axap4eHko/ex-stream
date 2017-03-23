import Accumulator from './Accumulator';

const _throttle = Symbol('Data throttler');
/**
 * Throttles stream data
 * @module Throttle
 * @example
 *  import Throttle from 'ex-stream/Throttle';
 *
 *  class DelayThrottle extends Throttle {
 *    _throttling(data, next) {
 *      setTimeout(1000, next);
 *    }
 *  }
 *
 */
export default class Throttle extends Accumulator {
  /**
   *
   * @param options
   * @example <caption>Class is abstract</caption>
   */
  constructor(options) {
    super(options);
  }

  /**
   * Throttle stream data
   *
   * @param {any} data
   * @abstract
   */
  _throttling(data) { // eslint-disable-line no-unused-vars
    throw new Error('Method _throttling is not defined');
  }

  /**
   * @private
   */
  _charge(data, enc, next) {
    if (typeof this[_throttle] === 'undefined') {
      this[_throttle] = data;
    } else {
      this[_throttle] += data;
    }
    this._throttling(this[_throttle], () => {
      this.push(this[_throttle]);
      delete this[_throttle];
    });
    next();
  }
}
