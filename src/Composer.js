import { Transform, PassThrough } from 'stream';

const _representative = Symbol('Composer representative');
/**
 * Compose streams into single stream
 * @module Composer
 */
export default class Composer extends Transform {
  /**
   *
   * @param {Array.<Stream>} streams Array of Streams
   * @param {Object} options Stream options
   */
  constructor({ streams, ...options }) {
    super(options);
    this[_representative] = new PassThrough(options);
    streams
      .reduce((source, Target) => source.pipe(new Target()), this)
      .pipe(this[_representative]);
  }

  /**
   *
   * @param {Stream} stream
   * @returns {Stream}
   */
  pipe(stream) {
    return this[_representative].pipe(stream);
  }

  /**
   *
   * @param {Stream} stream
   * @returns {Stream}
   */
  unpipe(stream) {
    return this[_representative].unpipe(stream);
  }
}
/**
 * Composer factory function
 * @param {Object} options
 * @returns {Composer}
 */
export function compose(options) {
  return new Composer(options);
}
