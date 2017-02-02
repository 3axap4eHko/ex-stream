'use strict';

import {Transform} from 'stream';

const _matcher = Symbol('Matcher');
const _executor = Symbol('Executor');

class Dispatcher extends Transform {
  static dispatch(matcher, executor) {
    return new Dispatcher(matcher, executor);
  }

  constructor(matcher, executor) {
    super({objectMode: true});
    this[_matcher] = matcher;
    this[_executor] = executor;
  }

  _transform(inpuData, enc, next) {
    const matched = this[_matcher](inpuData);
    new Promise(resolve => resolve(this[_executor](matched)))
      .then(result => next(null, result))
      .catch(error => next(error));
  }
}

export default Dispatcher;