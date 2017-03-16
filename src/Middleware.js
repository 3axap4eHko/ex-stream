import { Transform } from 'stream';

const _middlewares = Symbol('middlewares');
/**
 * @private
 */
function _iterate(iterator, data) {
  return new Promise((resolve, reject) => {
    const next = iterator.next();
    if (next.done) {
      return resolve(data);
    }
    next.value(data, (error) => {
      if (error) {
        reject(error);
      }
      resolve(_iterate(iterator, data));
    });
  }).catch(e => {
    console.log(e);
    throw e;
  });
}

/**
 * Pass stream data to middleware list
 * @module Middleware
 */
export default class Middleware extends Transform {
  /**
   * @param {Array.<Function>} middlewares
   */
  constructor(middlewares) {
    super({ objectMode: true });
    this[_middlewares] = middlewares;
  }

  /**
   * @private
   */
  _transform(data, enc, next) {
    _iterate(this[_middlewares][Symbol.iterator](), data, enc)
      .then(data => next(null, data), error => next(error));
  }
}

export function middleware(middlewares) {
  return new Middleware(middlewares);
}
