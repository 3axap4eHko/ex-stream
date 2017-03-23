import { Transform } from 'stream';

const _middlewares = Symbol('middlewares');
/**
 * @private
 */
function _iterate(iterator, data) {
  const next = iterator.next();
  if (next.done) {
    return data;
  }
  next.value(data, (error) => {
    if (error) {
      throw error;
    }
    _iterate(iterator, data);
  });
}

/**
 * Pass stream data to middleware list
 * @module Middleware
 * @example
 * import { createServer } from 'http';
 * import { middleware } from 'ex-stream/Middleware';
 *
 * const middlewares = [
 *    ({ req, res }, next) => {
 *      if (req.url === '/user') {
 *        res.end('USER');
 *      } else {
 *        next();
 *      }
 *    },
 *    ({ req, res }, next) => {
 *      if (req.url === '/messages') {
 *        res.end('MESSAGES');
 *      } else {
 *        next();
 *      }
 *    },
 *    ({ req, res }, next) => {
 *      next(new Error('Unknown request'));
 *    },
 * ];
 *
 * createServer((req, res) => {
 *    middleware(middlewares)
 *      .end({ req, res });
 * }).listen(3000, 'localhost');
 *
 */
export default class Middleware extends Transform {
  /**
   * @param {Array.<Function>} middlewares - list of middleware
   * @example <caption>Creates Middleware stream instance</caption>
   *  new Middleware(middlewareList);
   */
  constructor(middlewares) {
    super({ objectMode: true });
    this[_middlewares] = middlewares.concat([data => this.push(data)]);
  }

  /**
   * @private
   */
  _transform(data, enc, next) {
    try {
      _iterate(this[_middlewares][Symbol.iterator](), data);
    } catch (e) {
      this.emit('error', e);
    }
    next();
  }
}
/**
 * Middlewared stream factory function
 * @param {Array.<Function>} middlewares
 * @returns {Middleware}
 */
export function middleware(middlewares) {
  return new Middleware(middlewares);
}
