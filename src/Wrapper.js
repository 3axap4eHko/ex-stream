import {Transform} from 'stream';

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
   */
  constructor({wrapper, ...options}) {
    super({...options, objectMode: true});
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

export default function Wrap(wrapper) {
  return new Wrapper({wrapper});
}