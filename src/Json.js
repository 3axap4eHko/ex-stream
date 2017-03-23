import Stringify from './Stringify';
/**
 * Converts stream text data to JSON object
 * @module Jsonify
 * @example
 * import { createServer } from 'http';
 * import { json } from 'ex-stream/Json';
 *
 * createServer((req, res) => {
 *    req
 *      .pipe(json())
 *      .pipe(res);
 * }).listen(3000, 'localhost');
 *
 */
export default class Json extends Stringify {
  /**
   *
   * @param {Object} options - Stream options
   * @example <caption>Creates Json stream instance</caption>
   *  new Json()
   */
  constructor(options) {
    super(options);
  }
  /**
   * @private
   */
  _release() {
    return JSON.parse(super._release());
  }
}
/**
 * JSON stream factory function
 * @returns {Json}
 */
export function json() {
  return new Json();
}
