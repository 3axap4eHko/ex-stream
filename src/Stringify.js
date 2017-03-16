import Concat from './Concat';
/**
 * Collects stream data and converts it to string
 * @module Stringify
 */
export default class Stringify extends Concat {
  /**
   * @param {Object} options
   */
  constructor(options) {
    super({...options, init: ''});
  }

  /**
   * @private
   */
  _concat(result, chunk) {
    return result + chunk.toString();
  }
}

export function stringify(options) {
  return new Stringify(options);
}
