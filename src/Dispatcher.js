'use strict';

import {Transform} from 'stream';

const _actions = Symbol('Actions map');

class Dispatcher extends Transform {
  static dispatch(actions) {
    return new Dispatcher(actions);
  }

  constructor(actions) {
    super({objectMode: true});
    this[_actions] = actions;
    if (typeof this._dispatch !== 'function') {
      throw new Error('Method _dispatch is not defined');
    }
  }

  _transform({name, args}, enc, next) {
    this[_actions][name](...args, next);
  }
}

export default Dispatcher;