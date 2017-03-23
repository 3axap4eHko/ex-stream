import { Transform } from 'stream';

const _wrapper = Symbol('wrapper');
/**
 * Wrap stream as stream data
 * @module Wrapper
 */
class Wrapper extends Transform {
  /**
   *
   * @param {Function} wrapper
   * @param {Object} options
   * @example <caption>Creates Wrapper stream instance</caption>
   *  new Wrapper();
   */
  constructor({ wrapper, ...options }) {
    super({ ...options, objectMode: true });
    this[_wrapper] = wrapper;
  }

  /**
   * @private
   */
  _transform(data, enc, next) {
    this[_wrapper](data, enc)
      .on('data', data => this.push(data));
    next();
  }
}
/**
 *
 * @param {Function} wrapper
 * @returns {Wrapper}
 */
export default function wrap(wrapper) {
  return new Wrapper({ wrapper });
}