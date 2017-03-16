import Stringify from './Stringify';
/**
 * Converts stream text data to JSON object
 * @module Jsonify
 */
export default class Jsonify extends Stringify {
  /**
   * @private
   */
  _release() {
    return JSON.parse(super._release());
  }
}
