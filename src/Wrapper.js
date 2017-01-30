'use strict';

import {Transform} from 'stream';

const _wrapper = Symbol('wrapper');

class Wrapper extends Transform {
  constructor({wrapper, ...options}) {
    super({...options, objectMode: true});
    this[_wrapper] = wrapper;
  }

  _transform(data, enc, next) {
    this[_wrapper](data, enc)
      .on('data', data => this.push(data));
    next();
  }
}

export default function Wrap(wrapper) {
  return new Wrapper({wrapper});
}