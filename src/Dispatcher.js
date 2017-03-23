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
   * @param {function(inputData: *)} matcher - function matches `inputData` and returns `matchedData`
   * @param {function(matched: *)} executor - function executed with `matchedData` and returns value or `Promise` that passed to stream
   * @example <caption>Creates Dispatcher stream instance</caption>
   *
   *  function matcher(inputData) {
   *    // ...
   *  }
   *  function executor(matchedData) {
   *    // ...
   *  }
   *
   *  new Dispatcher(matcher, executor);
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
/**
 *
 * @param {Function} matcher
 * @param {Function} executor
 * @returns {Dispatcher}
 */
export function dispatch(matcher, executor) {
  return new Dispatcher(matcher, executor);
}
