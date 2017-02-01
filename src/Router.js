'use strict';

import {Transform} from 'stream';

const _routes = Symbol('routes');


class Router extends Transform {
  constructor({routes, ...options}) {
    super(options);
    this[_routes] = routes;
  }
  addRule(rule) {
    this[_routes].push(rule);
  }
  _transform(request, enc, next) {
    next(null, request);
  }
}

export default Router;