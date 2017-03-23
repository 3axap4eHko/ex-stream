import { Transform, PassThrough } from 'stream';

const _representative = Symbol('Composer representative');
/**
 * Compose streams into single stream
 * @module Composer
 * @example
 * import { createWriteStream } from 'fs';
 * import { compose } from 'ex-stream/Composer';
 *
 * const fileStream = fs.createWriteStream('myapp.log');
 * const composed = compose({
 *    streams: [
 *      fileStream,
 *      process.stdout,
 *    ]
 * });
 * composed.end('Some data'); // write to file and stdout
 */
export default class Composer extends Transform {
  /**
   *
   * @param {Array.<Stream>} options.streams - Array of Streams
   * @param {Object} options - Stream options
   * @example <caption>Creates Composer stream instance</caption>
   *  new Composer({
   *    streams: [
   *      process.stdout,
   *      fs.createWriteStream('filename.txt'),
   *    ]
   *  })
   */
  constructor({ streams, ...options }) {
    super(options);
    this[_representative] = new PassThrough(options);
    streams
      .reduce((source, target) => source.pipe(target), this)
      .pipe(this[_representative]);
  }

  /**
   * Attaches writable stream
   *
   * @param {Stream} stream
   * @returns {Stream}
   */
  pipe(stream) {
    return this[_representative].pipe(stream);
  }

  /**
   * Detaches writable stream
   * @param {Stream} stream
   * @returns {Stream}
   */
  unpipe(stream) {
    return this[_representative].unpipe(stream);
  }
}
/**
 * Composer factory function
 *
 * @param {Object} options
 * @returns {Composer}
 */
export function compose(options) {
  return new Composer(options);
}
