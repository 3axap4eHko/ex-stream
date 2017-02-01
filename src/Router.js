'use strict';

import {Transform} from 'stream';

const _routes = Symbol('routes');


class Router extends Transform {
  constructor({routes, ...options}) {
    super(options);

  }
  addRule(rule) {

  }
  _transform(request) {

  }
}

export default Router;