import { Transform } from 'stream';

const _matcher = Symbol('Matcher');
const _executor = Symbol('Executor');
/**
 * Call executor with matched `inputData`
 * @module Dispatcher
 * @example
 * import { createServer } from 'http';
 * import { dispatch } from 'ex-stream/Dispatcher';
 *
 * const matcher = req => requestParser(req);
 * const executor = params => JSON.stringify(params);
 *
 * createServer((req, res) => {
 *    dispatch(matcher, executor)
 *      .on(res)
 * }).listen(3000, 'localhost');
 *
 */
export default class Dispatcher extends Transform {
  /**
   *
   * @param {Function} matcher
   * @param {Function} executor
   */
  constructor(matcher, executor) {
    super({ objectMode: true });
    this[_matcher] = matcher;
    this[_executor] = executor;
  }

  /**
   * @private
   */
  _transform(inputData, enc, next) {
    const matched = this[_matcher](inputData);
    new Promise(resolve => resolve(this[_executor](matched)))
      .then(result => next(null, result))
      .catch(error => next(error));
  }
}

export function dispatch(matcher, executor) {
  return new Dispatcher(matcher, executor);
}
