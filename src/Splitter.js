import Accumulator from './Accumulator';

const _data = Symbol('data');
const _splitter = Symbol('splitter');
const _shift = Symbol('including splitter to result');
/**
 * Splits stream data
 * @module Splitter
 * @example
 * import { createReadStream } from 'fs';
 * import { split } from 'ex-stream/Splitter';
 * import { log } from 'ex-stream/LogStream';
 *
 * createReadStream('filename')
 *    .pipe(split({ splitter: '\n' }))
 *    .pipe(log()); // display file content line by line
 */
export default class Splitter extends Accumulator {
  /**
   *
   * @param {String} splitter
   * @param {Number} includingMode
   * @param {Object} options
   */
  constructor({splitter = '\n', includingMode, ...options} = {}) {
    super(options);
    this[_splitter] = splitter;
    this[_shift] = includingMode | 0;
    this[_data] = '';
  }

  /**
   * @private
   */
  _charge(data, enc, next) {
    this[_data] += data.toString();
    let index;
    while ((index = this[_data].indexOf(this[_splitter])) >= 0) {
      const splitted = this[_data].slice(0, index + this[_shift]);
      this.push(splitted);
      this[_data] = this[_data].slice(index + 1);
    }
    next();
  }

  /**
   * @private
   */
  _release() {
    return this[_data];
  }
}

export function split(options) {
  return new Splitter(options);
}
