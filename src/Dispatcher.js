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
  }

  _transform({name, args}, enc, next) {
    this[_actions][name](...args, next);
  }
}

export default Dispatcher;